import os.path
from pathlib import Path
from typing import Callable
from urllib.parse import parse_qsl, urlencode

import sqlalchemy.exc
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException
from starlette.middleware.cors import CORSMiddleware

from app.admin.sqlalchemy_admin import init_admin
from app.api import api_router
from app.db.database import engine
from app.db.models import User
from app.dependencies import get_db
from app.helpers import get_root_dir
from app.services.auth_service import get_password_hash, remove_session
from app.static import init_static

app = FastAPI(
    title="Laosüsteem",
    version="1",
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/openapi.json"
)

origins = [
    "https://localhost:3000",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_admin(app, engine)
init_static(app)


@app.on_event("startup")
async def startup_event():
    print("Startup")
    db_initial_user()
    Path(os.path.join(get_root_dir(), "storage", "generated")).mkdir(parents=True, exist_ok=True)
    Path(os.path.join(get_root_dir(), "storage", "images")).mkdir(parents=True, exist_ok=True)
    Path(os.path.join(get_root_dir(), "storage", "projects")).mkdir(parents=True, exist_ok=True)


@app.middleware("http")
async def filter_blank_query_params(request: Request, call_next: Callable):
    scope = request.scope
    if scope and scope.get("query_string"):
        filtered_query_params = parse_qsl(
            qs=scope["query_string"].decode("latin-1"),
            keep_blank_values=False,
        )
        scope["query_string"] = urlencode(filtered_query_params).encode("latin-1")
    return await call_next(request)


@app.exception_handler(sqlalchemy.exc.DatabaseError)
async def unicorn_exception_handler(request: Request, exc: sqlalchemy.exc.DatabaseError):
    return JSONResponse(
        status_code=418,
        content={"message": exc.orig.pgerror},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    headers = getattr(exc, "headers", None)
    if headers:
        response = JSONResponse(
            {"detail": exc.detail}, status_code=exc.status_code, headers=headers
        )
    else:
        response = JSONResponse({"detail": exc.detail}, status_code=exc.status_code)
    if exc.status_code == status.HTTP_401_UNAUTHORIZED:
        remove_session(response)
    return response


def db_initial_user():
    g = get_db()
    db: Session = next(g)
    # TODO use environment variables for user credentials
    if not db.query(User).where(User.email == 'admin@laosysteem.ee').count():
        db.execute(
            "INSERT INTO _user (email, hashed_password, is_validated, is_admin) "
            "VALUES ('admin@laosysteem.ee', '{}', true, true)".format(get_password_hash("password"))
        )
        db.commit()

app.include_router(api_router, prefix="/api/v1")
