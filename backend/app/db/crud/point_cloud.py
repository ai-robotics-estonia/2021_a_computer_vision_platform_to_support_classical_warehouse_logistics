from app.db.crud.base import CRUDBase

from app.db.models import PointCloud
from app.schemas.point_cloud import PointCloudUpdate, PointCloudCreate


class CRUDPointCloud(CRUDBase[PointCloud, PointCloudCreate, PointCloudUpdate]):
    ...


point_cloud_crud = CRUDPointCloud(PointCloud)
