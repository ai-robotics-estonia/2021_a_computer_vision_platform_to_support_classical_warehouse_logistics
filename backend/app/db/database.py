from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from app.config import get_settings
# from app.dependencies import get_db



@lru_cache()
def get_db_string():
    """
    Construct database connection string from config
    :return: database connection string
    """
    settings = get_settings()
    return "{}://{}:{}@{}:{}/{}".format(settings.db_connection,
                                        settings.db_username,
                                        settings.db_password,
                                        settings.db_host,
                                        settings.db_port,
                                        settings.db_database)


engine = create_engine(
    get_db_string(),
    echo=get_settings().db_echo
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
