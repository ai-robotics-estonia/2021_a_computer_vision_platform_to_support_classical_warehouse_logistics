from fastapi import APIRouter

from app.controllers import room_controller, image_controller, auth_controller, point_cloud_controller

api_router = APIRouter()
api_router.include_router(image_controller.router, prefix="", tags=["Images"])
api_router.include_router(room_controller.router, prefix="/rooms", tags=["Rooms"])
api_router.include_router(auth_controller.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(point_cloud_controller.router, prefix="/pc", tags=["Point cloud"])
