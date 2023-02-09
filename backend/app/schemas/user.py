from typing import Optional

from fastapi_camelcase import CamelModel as BaseModel
from pydantic import BaseModel as SnakeBase
from pydantic import EmailStr

from .base import Timestamps


class UserBase(BaseModel):
    email: EmailStr


class User(UserBase, Timestamps):
    id: Optional[int] = None
    is_validated: bool = False
    is_admin: bool = False

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    password: str


class UserInDB(User):
    hashed_password: Optional[str] = None

    class Config:
        orm_mode = True


class LoginData(SnakeBase):
    email: EmailStr
    password: str
