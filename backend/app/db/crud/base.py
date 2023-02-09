from typing import Any, Generic, List, Optional, Type, TypeVar

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import Base
from ...schemas.base import SearchBase

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**
        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def search(self, db: Session, *, mdl_in: SearchBase):
        return mdl_in.construct_query(db).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType, exclude=None, manual=None) -> ModelType:
        if manual is None:
            manual = {}
        obj_in_data = jsonable_encoder(obj_in, by_alias=False, exclude=exclude)
        db_obj = self.model(**obj_in_data, **manual)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, obj_in: CreateSchemaType, mdl_in: ModelType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in, by_alias=False)
        [mdl_in.__setattr__(key, obj_in_data[key]) for key in obj_in_data.keys()]
        db.commit()
        db.refresh(mdl_in)
        return mdl_in

    def commit(self, db: Session, *, mdl_in: ModelType) -> ModelType:
        db.commit()
        db.refresh(mdl_in)
        return mdl_in

    def delete(self, db: Session, *, mdl_in: ModelType):
        db.delete(mdl_in)
        db.commit()
