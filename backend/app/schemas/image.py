from typing import List, Union, Type

from fastapi import Query
from fastapi_camelcase import CamelModel as BaseModel

from app.db.domains import ImageTypeValues
from .base import Timestamps, SearchBase
from app.db.models import Image as ImageMDL


class ImageBase(BaseModel):
    name: str
    type: ImageTypeValues
    room_id: int


class ImageInDBBase(ImageBase):
    file_size: int
    resolution: str
    blurriness: int
    created_by_id: int


class Image(ImageInDBBase, Timestamps):
    id: int

    class Config:
        orm_mode = True


class ImageCreate(ImageInDBBase):
    ...


class ImageSearch(SearchBase):
    model = ImageMDL

    def __init__(self,
                 type_type: Union[List[ImageTypeValues], None] = Query(None),
                 room_id: int = Query(None)):
        self.type = type_type
        self.room_id = room_id
