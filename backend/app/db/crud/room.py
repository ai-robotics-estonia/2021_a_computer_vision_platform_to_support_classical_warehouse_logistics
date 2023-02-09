from app.db.crud.base import CRUDBase

from app.db.models import Room
from app.schemas.room import RoomCreate, RoomUpdate


class CRUDRoom(CRUDBase[Room, RoomCreate, RoomUpdate]):
    ...


room_crud = CRUDRoom(Room)
