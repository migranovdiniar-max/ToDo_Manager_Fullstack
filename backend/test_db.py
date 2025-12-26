import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from app.database import Settings

load_dotenv()
settings = Settings()

print(f"🔗 Подключаемся к: {settings.database_url.split('@')[1].split('/')[0]}")

engine = create_engine(settings.database_url)
try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("✅ Neon подключен!")
        print("📋 Создаем таблицы...")
        from app import models
        models.Base.metadata.create_all(bind=engine)
        print("✅ Таблицы созданы!")
except Exception as e:
    print(f"❌ Ошибка: {e}")
