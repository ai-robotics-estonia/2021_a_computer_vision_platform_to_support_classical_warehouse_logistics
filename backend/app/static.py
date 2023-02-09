import os
import stat
import typing

from fastapi import FastAPI, Request
from starlette import status
from starlette.background import BackgroundTask
from starlette.datastructures import Headers
from starlette.responses import Response, FileResponse
from starlette.staticfiles import StaticFiles, PathLike, NotModifiedResponse
from starlette.types import Scope, Receive, Send

import anyio

from app.helpers import get_root_dir
from app.services.sync_auth_service import s_get_current_active_user


class ChunkFileResponse(FileResponse):
    def __init__(self, path: typing.Union[str, "os.PathLike[str]"], status_code: int = 200,
                 headers: typing.Optional[typing.Mapping[str, str]] = None, media_type: typing.Optional[str] = None,
                 background: typing.Optional[BackgroundTask] = None, filename: typing.Optional[str] = None,
                 stat_result: typing.Optional[os.stat_result] = None, method: typing.Optional[str] = None,
                 content_disposition_type: str = "attachment") -> None:
        super().__init__(path, status_code, headers, media_type, background, filename, stat_result, method,
                         content_disposition_type)

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        file_range = None
        headers = scope["headers"]
        for val in headers:
            if val[0] == b"range":
                file_range = val[1].decode("utf-8")

        if file_range:
            file_range = file_range.split("=")[1]
            start, end = file_range.split("-")
            start, end = int(start), int(end) + 1
            chunk_size = end-start

            for i, val in enumerate(self.headers.raw):
                if val[0] == b"content-length":
                    self.headers.raw[i] = (b"content-length", str(chunk_size).encode())
                if val[0] == b"content-type":
                    self.headers.raw[i] = (b"content-type", b"multipart/byteranges")

        if self.stat_result is None:
            try:
                stat_result = await anyio.to_thread.run_sync(os.stat, self.path)
                self.set_stat_headers(stat_result)
            except FileNotFoundError:
                raise RuntimeError(f"File at path {self.path} does not exist.")
            else:
                mode = stat_result.st_mode
                if not stat.S_ISREG(mode):
                    raise RuntimeError(f"File at path {self.path} is not stat_result file.")
        await send(
            {
                "type": "http.response.start",
                "status": self.status_code,
                "headers": self.raw_headers,
            }
        )
        if self.send_header_only:
            await send({"type": "http.response.body", "body": b"", "more_body": False})
        else:
            if file_range:
                async with await anyio.open_file(self.path, mode="rb") as file:
                    await file.seek(start)
                    chunk = await file.read(chunk_size)
                    await send(
                        {
                            "type": "http.response.body",
                            "body": chunk,
                            "more_body": False,
                        }
                    )
            else:
                async with await anyio.open_file(self.path, mode="rb") as file:
                    more_body = True
                    while more_body:
                        chunk = await file.read(self.chunk_size)
                        more_body = len(chunk) == self.chunk_size
                        await send(
                            {
                                "type": "http.response.body",
                                "body": chunk,
                                "more_body": more_body,
                            }
                        )
        if self.background is not None:
            await self.background()


class AuthStaticFiles(StaticFiles):
    def __init__(self, *args, **kwargs) -> None:

        super().__init__(*args, **kwargs)

    async def __call__(self, scope, receive, send) -> None:

        assert scope["type"] == "http"

        request = Request(scope, receive)
        s_get_current_active_user(request)
        assert scope["type"] == "http"

        if not self.config_checked:
            await self.check_config()
            self.config_checked = True

        path = self.get_path(scope)
        response = await self.get_response(path, scope)
        await response(scope, receive, send)

    def file_response(self, full_path: PathLike, stat_result: os.stat_result, scope: Scope,
                      status_code: int = 200) -> Response:
        method = scope["method"]
        request_headers = Headers(scope=scope)

        response = ChunkFileResponse(
            full_path, status_code=status_code, stat_result=stat_result, method=method
        )
        if self.is_not_modified(response.headers, request_headers):
            return NotModifiedResponse(response.headers)
        return response

    async def get_response(self, path: str, scope: Scope):
        response = await super().get_response(path, scope)
        for val in scope["headers"]:
            if val[0] == b"range":
                response.status_code = status.HTTP_206_PARTIAL_CONTENT
                break

        response.headers["Access-Control-Allow-Headers"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "*"
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response


def init_static(app: FastAPI):
    app.mount("/api/v1/s_generated", AuthStaticFiles(directory=get_root_dir().joinpath("storage", "generated")), name="s_generated")
    app.mount("/api/v1/s_images", AuthStaticFiles(directory=get_root_dir().joinpath("storage", "images")), name="s_images")
