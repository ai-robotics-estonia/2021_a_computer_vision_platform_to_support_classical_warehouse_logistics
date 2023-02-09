from typing import TypeVar, Type, Generic, Any, Optional, Callable

from fastapi import Depends, HTTPException, status, Path
from paramiko.client import SSHClient
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db.database import SessionLocal, Base
from app.db.models import Room, PointCloud, Image


settings = get_settings()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_ssh_client():
    client = SSHClient()
    client.load_host_keys("/etc/laosysteem/known_hosts")
    client.connect(
        hostname=settings.remote_address,
        username=settings.remote_user,
        key_filename=f"/etc/laosysteem/{settings.remote_key_name}"
    )
    try:
        yield client
    finally:
        client.close()


ModelType = TypeVar("ModelType", bound=Base)


class ModelResolver(Generic[ModelType]):
    field: str = "id"

    def __init__(self, model: Type[ModelType]):
        """
        **Parameters**
        * `model`: A SQLAlchemy model class
        """
        self.model = model

    def _resolve_dependency(self, db, identifier):
        model = self._query_db(db, identifier)
        if not model:
            raise HTTPException(
                detail="Model with id {} not found".format(identifier),
                status_code=status.HTTP_404_NOT_FOUND
            )
        return model

    def _query_db(self, db: Session, identifier: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id == identifier).first()


class RoomResolver(ModelResolver[Room]):
    def __call__(self, roomId: int, db: Session = Depends(get_db)):
        return self._resolve_dependency(db, roomId)


class PointCloudResolver(ModelResolver[PointCloud]):
    def __call__(self, pointCloudId: int, db: Session = Depends(get_db)):
        return self._resolve_dependency(db, pointCloudId)


class ImageResolver(ModelResolver[Image]):
    def __call__(self, imageId: int, db: Session = Depends(get_db)):
        return self._resolve_dependency(db, imageId)


room_resolver = RoomResolver(Room)
point_cloud_resolver = PointCloudResolver(PointCloud)
image_resolver = ImageResolver(Image)
