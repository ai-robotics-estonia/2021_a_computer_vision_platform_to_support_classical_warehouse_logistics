import binascii
from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status
from starlette.requests import Request
from starlette.responses import Response

from app.db.models import User
from app.dependencies import get_db
from app.services.auth_service import decrypt_session, get_user_by_email_cached, add_session


def get_current_active_user(current_user: User):
    if not current_user.is_validated:
        raise HTTPException(status_code=400, detail="User not validated")
    return current_user


def get_current_user_cached(
        response: Response,
        db: Session,
        session: Optional[str],
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


def s_get_current_active_user(request: Request):
    session = request.cookies.get("Session", None)
    user = get_current_user_cached(Response(), next(get_db()), session)
    user = get_current_active_user(user)
    return user
