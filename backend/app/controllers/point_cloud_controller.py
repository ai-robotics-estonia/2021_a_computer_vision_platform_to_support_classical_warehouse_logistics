from fastapi import APIRouter, Depends, Response, status, Body
from sqlalchemy.orm import Session

from ..dependencies import get_db, point_cloud_resolver
from app.schemas.point_cloud import PointCloud, PointCloudOffset, PointCloudCreateIn
from app.services import point_cloud_service
from app.db.crud.point_cloud import point_cloud_crud
from ..schemas.user import User
from ..services.auth_service import get_current_active_user
from ..services.point_cloud_service import init_cloud_folder

router = APIRouter()


@router.get("/{pointCloudId}", response_model=PointCloud)
async def get_point_cloud_by_id(current_user: User = Depends(get_current_active_user),
                                point_cloud=Depends(point_cloud_resolver)):
    return point_cloud


@router.post("/", response_model=PointCloud)
async def create_point_cloud(current_user: User = Depends(get_current_active_user),
                             pc: PointCloudCreateIn = Body(),
                             db: Session = Depends(get_db)):
    return point_cloud_service.create_point_cloud(db, pc, current_user.id)


@router.post("/{pointCloudId}/offset", status_code=status.HTTP_204_NO_CONTENT)
async def set_point_cloud_offset(offset: PointCloudOffset,
                                 current_user: User = Depends(get_current_active_user),
                                 point_cloud=Depends(point_cloud_resolver),
                                 db: Session = Depends(get_db)):
    point_cloud_service.set_point_cloud_offset(db, point_cloud, offset)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/{pointCloudId}/init", status_code=status.HTTP_200_OK)
async def init_cloud(current_user: User = Depends(get_current_active_user),
                     point_cloud=Depends(point_cloud_resolver),
                     db: Session = Depends(get_db)):
    init_cloud_folder(point_cloud)
    point_cloud_service.init_new_cloud(db, point_cloud)


@router.delete("/{pointCloudId}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cloud(current_user: User = Depends(get_current_active_user),
                      point_cloud=Depends(point_cloud_resolver)):
    # TODO On delete check and cancel slurm job
    point_cloud_service.delete_folder_from_disc(point_cloud)
    point_cloud_crud.delete(point_cloud)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
