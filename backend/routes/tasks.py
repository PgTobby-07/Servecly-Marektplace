from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.task_models import TaskCreate

router = APIRouter(tags=["Tasks"])

@router.post("")
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    db.execute(text("""
        INSERT INTO Task (client_id, category_id, service_id, title, description, location, budget)
        VALUES (:client_id, :categoryId, :service_id, :title, :description, :location, :budget)
    """), data.dict())

    db.commit()
    return {"message": "Task posted successfully"}

@router.get("")
def get_tasks(category: int = None, status: str = None, db: Session = Depends(get_db)):
    query = "SELECT * FROM Task WHERE 1=1"
    params = {}

    if category:
        query += " AND category_id = :category"
        params["category"] = category

    if status:
        query += " AND status = :status"
        params["status"] = status

    result = db.execute(text(query), params).fetchall()
    return [dict(row._mapping) for row in result]
