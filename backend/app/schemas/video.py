from fastapi_camelcase import CamelModel as BaseModel
from .base import Timestamps


class VideoBase(BaseModel):
    event_id: int
    description: str
    image_id: int
    file_name: str
    start_frame: int


class VideoInDBBase(VideoBase, Timestamps):
    id: int


class Event(VideoInDBBase):

    class Config:
        orm_mode = True


class VideoCreate(VideoBase):
    ...
