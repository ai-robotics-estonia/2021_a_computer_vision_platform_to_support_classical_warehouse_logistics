from typing import Optional, List
from uuid import UUID

from fastapi_camelcase import CamelModel as BaseModel

from .base import Timestamps
from .point_cloud import PointCloud


class RoomBase(BaseModel):
    name: str
    description: str


class Room(RoomBase, Timestamps):
    id: int
    point_clouds: List[PointCloud]
    file_path: UUID
    created_by_id: int

    class Config:
        orm_mode = True


class RoomCreate(RoomBase):
    pass


class RoomUpdate(RoomBase):
    pass
