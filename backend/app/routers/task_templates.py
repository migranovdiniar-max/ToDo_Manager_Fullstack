from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db
from app.oauth2 import get_current_user


router = APIRouter(
    prefix="/task-templates",
    tags=["task_templates"],
)


@router.get("/", response_model=List[schemas.TaskTemplate])
def list_task_templates(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """
    Список шаблонов задач текущего пользователя.
    При желании можно добавить сюда также глобальные шаблоны.
    """
    return (
        db.query(models.TaskTemplate)
        .filter(models.TaskTemplate.user_id == current_user.id)
        .order_by(models.TaskTemplate.title)
        .all()
    )


@router.post("/", response_model=schemas.TaskTemplate, status_code=status.HTTP_201_CREATED)
def create_task_template(
    template: schemas.TaskTemplateCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    """
    Создать шаблон задачи: заголовок, опциональное описание и дефолтная категория.
    """
    # при желании можно проверять уникальность title для пользователя
    db_tpl = models.TaskTemplate(
        title=template.title,
        default_description=template.default_description,
        default_category_id=template.default_category_id,
        user_id=current_user.id,
    )
    db.add(db_tpl)
    db.commit()
    db.refresh(db_tpl)
    return db_tpl
