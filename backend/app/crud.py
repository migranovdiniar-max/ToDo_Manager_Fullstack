from sqlalchemy.orm import Session
from app import models, schemas


def get_tasks(db: Session, skip: int=0, limit: int=100):
    return db.query(models.Task).offset(skip).limit(limit).all()


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def toggle_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task:
        task.completed = not task.completed
        db.commit()
        db.refresh(task)
    return task


def delete_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task:
        db.delete(task)
        db.commit()
    return task