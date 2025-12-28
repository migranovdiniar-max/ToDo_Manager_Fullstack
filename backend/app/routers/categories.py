from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db
from app.oauth2 import get_current_user


router = APIRouter(
    prefix="/categories",
    tags=["categories"],
)


@router.get("/", response_model=List[schemas.Category])
def list_categories(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """Категории только текущего пользователя."""
    return (
        db.query(models.Category)
        .filter(models.Category.user_id == current_user.id)
        .order_by(models.Category.name)
        .all()
    )


@router.post("/", response_model=schemas.Category, status_code=status.HTTP_201_CREATED)
def create_category(
    category: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """Создать свою категорию (имя уникально для пользователя)."""
    existing = (
        db.query(models.Category)
        .filter(
            models.Category.user_id == current_user.id,
            models.Category.name == category.name,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Категория с таким именем уже существует",
        )

    db_cat = models.Category(
        name=category.name,
        color=category.color,
        user_id=current_user.id,
    )
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat
