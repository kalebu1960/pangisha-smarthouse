import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    database_url = os.environ.get("DATABASE_URL")

    if database_url and database_url != "postgresql://postgres:password@localhost/mydatabase":
        SQLALCHEMY_DATABASE_URI = database_url
    else:
        db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "instance", "pangisha-dev.db"))
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_path}"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", SECRET_KEY)
    