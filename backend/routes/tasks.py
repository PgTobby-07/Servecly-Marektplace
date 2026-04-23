from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.task_models import TaskCreate

router = APIRouter(tags=["Tasks"])

@router.post("")
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    db.execute(text("""
        INSERT INTO Task (client_id, category_id, service_id, title, description, location, budget, scheduled_time, status)
        VALUES (:client_id, :categoryId, :service_id, :title, :description, :location, :budget, :scheduled_time, :status)
    """), {
        "client_id": data.client_id,
        "categoryId": data.categoryId, 
        "service_id": data.service_id,
        "title": data.title,
        "description": data.description,
        "location": data.location,
        "budget": data.budget,
        "scheduled_time": data.scheduled_time,
        "status": "open"
    })

    db.commit()
    return {"message": "Task posted successfully"}
