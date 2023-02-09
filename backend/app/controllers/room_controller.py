from typing import List

from fastapi import APIRouter, Depends, Response, status, Body
from sqlalchemy.orm import Session

from app.db.crud.room import room_crud
from ..dependencies import get_db, room_resolver
from app.schemas.room import Room, RoomCreate, RoomUpdate
from app.services import room_service, image_service, point_cloud_service
from ..schemas.user import User
from ..services.auth_service import get_current_active_user

router = APIRouter()


@router.get("/{roomId}", response_model=Room)
async def get_room_by_id(current_user: User = Depends(get_current_active_user),
                         room=Depends(room_resolver)):
    return room


@router.get("/", response_model=List[Room])
async def get_rooms(current_user: User = Depends(get_current_active_user),
                    db: Session = Depends(get_db)):
    return room_crud.get_multi(db)


@router.post("/", response_model=Room)
async def create_room(current_user: User = Depends(get_current_active_user),
                      new_room: RoomCreate = Body(),
                      db: Session = Depends(get_db)):
    return room_service.create_room(db, new_room, current_user.id)


@router.put("/{roomId}", response_model=Room)
async def update_room(current_user: User = Depends(get_current_active_user),
                      updated_room: RoomUpdate = Body(),
                      room=Depends(room_resolver),
                      db: Session = Depends(get_db)):
    return room_service.update_room(db, updated_room, room)


@router.delete("/{roomId}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_room(current_user: User = Depends(get_current_active_user),
                      room=Depends(room_resolver),
                      db: Session = Depends(get_db)):
    image_service.delete_room_images(db, room)
    point_cloud_service.delete_room_point_clouds(db, room)
    room_crud.delete(db, mdl_in=room)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
