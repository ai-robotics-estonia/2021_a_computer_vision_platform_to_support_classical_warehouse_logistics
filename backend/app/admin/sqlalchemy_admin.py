from typing import Union

from sqladmin import Admin, ModelAdmin
from sqlalchemy.ext.asyncio import AsyncEngine
from starlette.applications import Starlette
from sqlalchemy.engine import Engine
from starlette.requests import Request

from app.db.models import User, Image, PointCloud, Room
from app.services.sync_auth_service import s_get_current_active_user


class SimpleAuth(ModelAdmin):

    def is_visible(self, request: Request) -> bool:
        user = s_get_current_active_user(request)
        return user

    def is_accessible(self, request: Request) -> bool:
        user = s_get_current_active_user(request)
        return user


class UserAdmin(SimpleAuth, model=User):
    column_list = [User.id, User.email, User.is_validated]

    form_columns = [User.email, User.is_validated]


class RoomAdmin(SimpleAuth, model=Room):
    column_list = [Room.id, Room.name, Room.description, Room.file_path, Room.created_by]

    form_columns = [Room.name, Room.description]

    column_formatters = {
        Room.created_by: lambda m, a: m.created_by.email,
    }


class ImageAdmin(SimpleAuth, model=Image):
    column_list = [Image.id, Image.name, Image.type, Image.file_size, Image.resolution, Image.blurriness, Image.room_id, Image.created_by]

    form_columns = [Image.blurriness]

    column_formatters = {
        Image.created_by: lambda m, a: m.created_by.email,
        Image.file_size: lambda m, a: f"{(m.file_size / 1000000):.2f}MB"
    }


class PointCloudAdmin(SimpleAuth, model=PointCloud):
    column_list = [PointCloud.id, PointCloud.room_id, PointCloud.file_path, PointCloud.colmap_attributes, PointCloud.queued_at, PointCloud.started_at, PointCloud.finished_at, PointCloud.slurm_id, PointCloud.slurm_exit_code, PointCloud.slurm_state, PointCloud.created_by]
    form_columns = [PointCloud.queued_at, PointCloud.started_at, PointCloud.finished_at, PointCloud.slurm_id, PointCloud.slurm_exit_code, PointCloud.slurm_state]

    column_formatters = {
        PointCloud.created_by: lambda m, a: m.created_by.email,
    }


def init_admin(app: Starlette, engine: Union[Engine, AsyncEngine]):
    admin = Admin(app, engine, base_url="/api/v1/admin")

    admin.register_model(UserAdmin)
    admin.register_model(RoomAdmin)
    admin.register_model(ImageAdmin)
    admin.register_model(PointCloudAdmin)
