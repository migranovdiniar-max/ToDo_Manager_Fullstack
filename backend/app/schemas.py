from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# ---------- Категории ----------

class CategoryBase(BaseModel):
    name: str
    color: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# ---------- Задачи ----------

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    is_pinned: Optional[bool] = False
    category_id: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    is_pinned: Optional[bool] = None
    category_id: Optional[int] = None


class Task(TaskBase):
    id: int
    completed: bool
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True


# ---------- Пользователи ----------

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- JWT ----------

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: int
    username: str | None = None


# ---------- Шаблоны задач ----------

class TaskTemplateBase(BaseModel):
    title: str
    default_description: Optional[str] = None
    default_category_id: Optional[int] = None


class TaskTemplateCreate(TaskTemplateBase):
    pass


class TaskTemplate(TaskTemplateBase):
    id: int

    class Config:
        from_attributes = True
