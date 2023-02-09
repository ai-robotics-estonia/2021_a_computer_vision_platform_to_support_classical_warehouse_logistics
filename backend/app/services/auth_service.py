import binascii
from base64 import b64encode, b64decode
from datetime import timedelta
from typing import Optional

from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util import Padding
from cachetools import cached, TTLCache
from cachetools.keys import hashkey
from fastapi import Depends, HTTPException, status, Cookie
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from starlette.responses import Response

from app.db.crud.user import user_crud
from app.schemas.user import User, UserCreate
from ..config import get_settings
from ..dependencies import get_db

SECRET_KEY = get_settings().secret_key
SECRET_KEY_BYTES = bytes.fromhex(get_settings().secret_key)
ALGORITHM = "HS256"
SESSION_EXPIRE_MINUTES = get_settings().access_token_expire
BLOCK_SIZE = AES.block_size
DOMAIN = get_settings().domain

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def encrypt_session(email: str):
    iv = get_random_bytes(16)
    session_data = Padding.pad(email.encode('utf-8'), BLOCK_SIZE)
    cipher = AES.new(SECRET_KEY_BYTES, AES.MODE_CBC, iv)
    body = b64encode(cipher.encrypt(session_data)).decode('utf-8')
    iv = b64encode(iv).decode('utf-8')
    return f"{iv}.{body}"


def decrypt_session(session_data: str):
    iv, body = session_data.split(".")
    body = b64decode(body.encode('utf-8'))
    iv = b64decode(iv.encode('utf-8'))
    cipher = AES.new(SECRET_KEY_BYTES, AES.MODE_CBC, iv)
    body = Padding.unpad(cipher.decrypt(body), BLOCK_SIZE).decode('utf-8')
    return body


def add_session(response: Response, email: str):
    response.set_cookie(
        "Session",
        encrypt_session(email),
        max_age=timedelta(minutes=SESSION_EXPIRE_MINUTES).seconds,
        secure=False,
        httponly=True,
        samesite="lax",
        domain=DOMAIN)


def remove_session(response: Response):
    response.delete_cookie(
        "Session",
        secure=False,
        httponly=True,
        samesite="lax",
        domain=DOMAIN)


async def get_current_user(
        response: Response,
        db: Session = Depends(get_db),
        session: Optional[str] = Cookie(alias="Session", include_in_schema=False, default=None),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        email = decrypt_session(session)
    except (binascii.Error, ValueError, AttributeError):
        raise credentials_exception
    user = get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    add_session(response, user.email)
    return user


async def get_current_user_cached(
        response: Response,
        db: Session = Depends(get_db),
        session: Optional[str] = Cookie(alias="Session", include_in_schema=False, default=None),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        email = decrypt_session(session)
    except (binascii.Error, ValueError, AttributeError):
        raise credentials_exception
    user = get_user_by_email_cached(db, email)
    if user is None:
        raise credentials_exception
    add_session(response, user.email)
    return user


@cached(cache=TTLCache(128, 120), key=lambda db, email: hashkey(email))
def get_user_by_email_cached(db, email):
    user = user_crud.get_user_by_email(db, email=email)
    return user


def get_user_by_email(db, email):
    user = user_crud.get_user_by_email(db, email=email)
    return user


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(db: Session, email: str, password: str):
    user = user_crud.get_user_by_email(db, email=email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_validated:
        raise HTTPException(status_code=400, detail="User not validated")
    return current_user


def register_new_user(db: Session, new_user: UserCreate):
    new_user.password = get_password_hash(new_user.password)
    return user_crud.create(db, obj_in=new_user)
