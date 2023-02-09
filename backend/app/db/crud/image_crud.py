from app.db.crud.base import CRUDBase

from app.db.models import Image
from app.schemas.image import Image as ImageUpdate, ImageCreate


class CRUDImage(CRUDBase[Image, ImageCreate, ImageUpdate]):
    ...


image_crud = CRUDImage(Image)
