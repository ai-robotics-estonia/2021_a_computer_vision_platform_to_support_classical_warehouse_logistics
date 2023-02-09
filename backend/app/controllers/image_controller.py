import os.path
from typing import List

import aiofiles
from fastapi import APIRouter, File, UploadFile, Depends, Query, Form, status, Response
from sqlalchemy.orm import Session

from app.db.crud.image_crud import image_crud
from app.db.domains import ImageTypeValues
from app.db.models import Room
from app.dependencies import room_resolver, get_db, image_resolver
from app.helpers import get_image_folder_path
from app.schemas.image import ImageSearch, Image
from app.schemas.user import User
from app.services.auth_service import get_current_active_user
from app.services import image_service, room_service
from app.services.room_service import init_room_folder

router = APIRouter()


@router.get("/images/{imageId}", response_model=Image)
async def get_image_by_id(current_user: User = Depends(get_current_active_user),
                          image=Depends(image_resolver)):
    return image


@router.get("/images", response_model=List[Image])
async def get_images(current_user: User = Depends(get_current_active_user),
                     search: ImageSearch = Depends(),
                     db: Session = Depends(get_db)):
    crud_search = image_crud.search(db, mdl_in=search)
    return crud_search


@router.post("/room/{roomId}/images", description="Upload images to project")
async def upload_files(
        current_user: User = Depends(get_current_active_user),
        img_type: ImageTypeValues = Form(alias="type"),
        room: Room = Depends(room_resolver),
        files: list[UploadFile] = File(description="Images to upload"),
        db: Session = Depends(get_db)):
    init_room_folder(room)
    path_base = get_image_folder_path(room.file_path, img_type)
    for file in files:
        file_path = os.path.join(path_base, file.filename)
        async with aiofiles.open(file_path, 'wb') as out_file:
            while content := await file.read(1024):  # async read chunk
                await out_file.write(content)  # async write chunk
            file_size = await out_file.tell()  # The current position is the file_size
            await image_service.create_image(db, file.filename, img_type, room.id, file_size, file_path, current_user.id)


@router.delete("/images/{imageId}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(current_user: User = Depends(get_current_active_user),
                       image=Depends(image_resolver),
                       db: Session = Depends(get_db)):
    room = room_service.room_crud.get(db, image.room_id)
    image_service.delete_image(db, image, room)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
