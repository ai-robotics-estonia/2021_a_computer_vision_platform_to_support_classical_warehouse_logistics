from fastapi_camelcase import CamelModel as BaseModel
from .base import Timestamps
from uuid import UUID


class EventBase(BaseModel):
    name: str
    description: str
    pc_id: int
    is_live: bool


class EventInDBBase(EventBase, Timestamps):
    id: int
    file_path: UUID


class Event(EventInDBBase):
    id: int

    class Config:
        orm_mode = True


class EventCreate(EventBase):
    ...