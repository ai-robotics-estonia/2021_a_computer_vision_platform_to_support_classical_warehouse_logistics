from fastapi_camelcase import CamelModel as BaseModel
from .base import Timestamps


class StreamBase(BaseModel):
    event_id: int
    description: str
    image_id: int
    url: str


class StreamInDBBase(StreamBase, Timestamps):
    id: int


class Event(StreamInDBBase):

    class Config:
        orm_mode = True


class StreamCreate(StreamBase):
    ...
