from sqlalchemy.orm import Session

from app.db.crud.room import room_crud
from app.db.models import Room
from app.helpers import create_storage_folder
from app.schemas.room import RoomCreate, RoomUpdate


def create_room(db: Session, new_room: RoomCreate, created_by):
    room = room_crud.create(db, obj_in=new_room, manual={"created_by_id": created_by})
    init_room_folder(room)
    return room


def update_room(db: Session, updated_room: RoomUpdate, room: Room):
    return room_crud.update(db, obj_in=updated_room, mdl_in=room)


def init_room_folder(room: Room):
    paths = [
        ["images", str(room.file_path)],
        ["images", str(room.file_path), "camera"],
        ["images", str(room.file_path), "cctv"],
        ["images", str(room.file_path), "mask"],
    ]
    for path in paths:
        create_storage_folder(path)
