from datetime import datetime
from typing import TypeVar

from sqlalchemy.orm import Session, Query

from app.db.database import Base
from fastapi_camelcase import CamelModel as BaseModel

ModelType = TypeVar("ModelType", bound=Base)


class Timestamps(BaseModel):
    created_at: datetime
    updated_at: datetime


class SearchBase:
    model = None

    def construct_query(self, db: Session):
        if not self.model:
            raise Exception("Model attribute needs to be set")
        query: Query = db.query(self.model)
        for key, value in self.__dict__.items():
            if isinstance(value, list):
                query = query.where(getattr(self.model, key).in_(value))
            else:
                query = query.where(getattr(self.model, key) == value)
        return query
