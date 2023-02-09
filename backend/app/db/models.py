import numpy as np
from sqlalchemy import Boolean, ForeignKey, Integer, String, DateTime, func, Text, PickleType, text, \
    UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declared_attr, declarative_mixin
from .domains import *

from app.db.database import Base


class Timestamps(object):
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), server_default=func.now(), onupdate=func.now())


@declarative_mixin
class CreatedByMixin:
    @declared_attr
    def created_by_id(cls):
        return Column(Integer, ForeignKey("_user.id", name="created_by_fkey"), nullable=False)


class User(Base, Timestamps):
    __tablename__ = "_user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_validated = Column(Boolean, default=False, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)

    rooms = relationship("Room", back_populates="created_by")
    point_clouds = relationship("PointCloud", back_populates="created_by")
    images = relationship("Image", back_populates="created_by")
    landmarks = relationship("Landmark", back_populates="created_by")


class Room(Base, Timestamps, CreatedByMixin):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String, nullable=False)
    file_path = Column(UUID, server_default=text("uuid_generate_v4()"), nullable=False)

    point_clouds = relationship("PointCloud", back_populates="room", lazy='select')
    images = relationship("Image", back_populates="room")
    landmarks = relationship("Landmark", back_populates="room")
    created_by = relationship("User", back_populates="rooms")


class Image(Base, Timestamps, CreatedByMixin):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(Enum(ImageTypeValues), nullable=False)
    room_id = Column(Integer, ForeignKey("room.id", ondelete="CASCADE", name="image_room_id_fkey"), nullable=False)
    file_size = Column(Integer)
    resolution = Column(String(25))
    blurriness = Column(Integer)

    room = relationship("Room", back_populates="images")
    created_by = relationship("User", back_populates="images")

    __table_args__ = (UniqueConstraint("room_id", "type", "name", name="UQ_image_room_id_type_name"),)


class PointCloud(Base, Timestamps, CreatedByMixin):
    __tablename__ = "point_cloud"

    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("room.id", ondelete="CASCADE", name="point_cloud_room_id_fkey"), nullable=False)
    file_path = Column(UUID, server_default=text("uuid_generate_v4()"), nullable=False)
    colmap_attributes = Column(Text)
    matrix = Column(PickleType, nullable=False, default=np.eye(4))
    queued_at = Column(DateTime())
    started_at = Column(DateTime())
    finished_at = Column(DateTime())
    point_count = Column(Integer)
    slurm_id = Column(Integer)
    slurm_exit_code = Column(Integer)
    slurm_state = Column(String(255))

    room = relationship("Room", back_populates="point_clouds")
    created_by = relationship("User", back_populates="point_clouds")


class Landmark(Base, Timestamps, CreatedByMixin):
    __tablename__ = "landmark"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    room_id = Column(Integer, ForeignKey("room.id", ondelete="CASCADE", name="landmark_room_id_fkey"), nullable=False)
    data = Column(Text, nullable=False)

    room = relationship("Room", back_populates="landmarks")
    created_by = relationship("User", back_populates="landmarks")


class Event(Base, Timestamps, CreatedByMixin):
    __tablename__ = "event"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String)
    file_path = Column(UUID, server_default=text("uuid_generate_v4()"), nullable=False)
    pc_id = Column(Integer, ForeignKey("point_cloud.id", ondelete="CASCADE", name="event_point_cloud_id_fkey"), nullable=False)
    is_live = Column(Boolean, default=False, nullable=False)


class Stream(Base, Timestamps, CreatedByMixin):
    __tablename__ = "stream"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    image_id = Column(Integer, ForeignKey("image.id", ondelete="CASCADE", name="stream_image_id_fkey"), nullable=False)
    url = Column(String, nullable=False)


class Video(Base, Timestamps, CreatedByMixin):
    __tablename__ = "video"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    image_id = Column(Integer, ForeignKey("image.id", ondelete="CASCADE", name="stream_image_id_fkey"), nullable=False)
    file_name = Column(String, nullable=False)
    start_frame = Column(Integer)
