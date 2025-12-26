from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas
from app.database import get_db


router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)

@router.get("/", response_model=List[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks


@router.post("/", response_model=schemas.Task, status_code=201)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db=db, task=task)


@router.patch("/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int, 
    completed: bool | None = None,  # ← Опционально
    db: Session = Depends(get_db)
):
    task = crud.get_task(db, task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if completed is not None:
        task.completed = completed
    
    db.commit()
    db.refresh(task)
    return task



@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.delete_task(db, task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")