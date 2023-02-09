import os.path
import shutil
import PIL.Image
from sqlalchemy.orm import Session

from app.db.crud.image_crud import image_crud
from app.db.domains import ImageTypeValues
from app.schemas.image import ImageCreate, ImageSearch
from app.db.models import Image, Room
from app.helpers import get_image_folder_path


def analyze_image(path: str):
    image = PIL.Image.open(path)
    return image.height, image.width


async def create_image(db: Session, filename: str, img_type: ImageTypeValues, room_id: int, file_size, file_path: str, created_by: int):
    height, width = analyze_image(file_path)
    img_in = ImageCreate(
        name=filename,
        type=img_type,
        room_id=room_id,
        file_size=file_size,
        resolution=f"{width}x{height}",
        blurriness=-1,
        created_by_id=created_by
    )
    image_crud.create(db, obj_in=img_in)


def delete_image_folder_from_disc(room: Room):
    path = get_image_folder_path(room.file_path)
    if not os.path.exists(path):
        return
    shutil.rmtree(path)


def delete_image_from_disc(image: Image, room: Room):
    path_base = get_image_folder_path(room.file_path, image.type)
    file_path = os.path.join(path_base, image.name)
    if not os.path.exists(file_path):
        return
    os.remove(file_path)


def delete_image_mask(db: Session, image: Image, room: Room):
    _mask = ImageSearch([ImageTypeValues.mask], room.id)
    _mask.name = image.name + '.png'
    mask_image = image_crud.search(db, mdl_in=_mask)
    if mask_image:
        delete_image(db, mask_image[0], room)


def delete_image(db: Session, image: Image, room: Room):
    delete_image_mask(db, image, room)
    delete_image_from_disc(image, room)
    image_crud.delete(db, mdl_in=image)


def delete_room_images(db: Session, room: Room):
    delete_image_folder_from_disc(room)
    _room_images = ImageSearch([ImageTypeValues.mask, ImageTypeValues.cctv, ImageTypeValues.camera], room.id)
    room_images = image_crud.search(db, mdl_in=_room_images)
    for room_image in room_images:
        image_crud.delete(db, mdl_in=room_image)
