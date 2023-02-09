from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    app_env: str = "local"
    app_name: str = "Laosüsteem"
    secret_key: str
    domain: str = "localhost"
    access_token_expire: int = 120

    # ------- db settings -------

    db_connection: str = "postgresql"
    db_host: str = "localhost"
    db_port: int = 5433
    db_database: str = "laosysteem"
    db_username: str = "user" # replace with appropriate user name
    db_password: str = "password" # replace with appropriate password
    db_echo: bool = False

    # ------- remote server settings -------

    remote_address: str
    remote_user: str
    remote_base_path: str
    remote_key_name: str

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
