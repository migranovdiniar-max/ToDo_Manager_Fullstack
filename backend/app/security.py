# backend/app/security.py

from passlib.context import CryptContext

# Используем argon2 — современный и безопасный алгоритм
# Поддерживает пароли любой длины (в отличие от bcrypt)
pwd_context = CryptContext(
    schemes=["argon2"],           # Основной метод — argon2
    deprecated="auto",            # Авто-обновление устаревших хешей
    argon2__memory_cost=65536,    # 64 MB — защита от GPU-атак
    argon2__time_cost=3,          # 3 прохода
    argon2__parallelism=2,        # 2 потока
)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Проверяет, совпадает ли введённый пароль с хешем.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Хеширует пароль с помощью argon2.
    Поддерживает очень длинные пароли — обрезка не нужна!
    """
    return pwd_context.hash(password)
