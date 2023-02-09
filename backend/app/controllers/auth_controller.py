from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response

from app.schemas.user import User, UserCreate, LoginData
from app.services.auth_service import authenticate_user, \
    register_new_user, get_current_user, add_session, remove_session
from ..dependencies import get_db

router = APIRouter()


@router.post("/login", response_model=User)
async def login_for_access_cookie(response: Response, form_data: LoginData, db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    add_session(response, user.email)
    return user


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response):
    remove_session(response)
    response.status_code = status.HTTP_204_NO_CONTENT
    return response


@router.get("/user", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/register", response_model=User)
async def register_user(new_user: UserCreate, db: Session = Depends(get_db)):
    user = register_new_user(db, new_user)
    return user
