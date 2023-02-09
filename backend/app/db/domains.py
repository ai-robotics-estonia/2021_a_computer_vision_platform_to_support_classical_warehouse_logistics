import enum

from sqlalchemy import Column, Enum, event, table

from app.db.database import Base


class ImageTypeValues(enum.Enum):
    camera = "camera"
    cctv = "cctv"
    mask = "mask"

