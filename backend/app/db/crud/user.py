from sqlalchemy.orm import Session

from app.db import models

from app.db.crud.base import CRUDBase

from app.db.models import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_user = models.User(email=obj_in.email, hashed_password=obj_in.password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def get_user_by_email(self, db: Session, email: str):
        return db.query(models.User).filter(models.User.email == email).first()


user_crud = CRUDUser(User)
