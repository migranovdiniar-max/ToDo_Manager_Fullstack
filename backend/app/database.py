from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str

    class Config:
        env_file = ".env"

settings = Settings()

# ✅ КРИТИЧНО: postgresql+psycopg для psycopg3!
DATABASE_URL = settings.database_url.replace("postgresql://", "postgresql+psycopg://")
print(f"🔗 Используем: {DATABASE_URL.split('@')[1].split('/')[0]}")  # Для дебага

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
