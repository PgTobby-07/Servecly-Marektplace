from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.task_models import TaskCreate

router = APIRouter(tags=["Tasks"])

@router.post("")
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    try:
        # logic: You must add scheduled_time here to match your DB columns
        db.execute(text("""
            INSERT INTO Task (client_id, category_id, service_id, title, description, location, budget, scheduled_time)
            VALUES (:client_id, :categoryId, :service_id, :title, :description, :location, :budget, :scheduled_time)
        """), {
            "client_id": data.client_id,
            "categoryId": data.categoryId,
            "service_id": data.service_id,
            "title": data.title,
            "description": data.description,
            "location": data.location,
            "budget": data.budget,
            "scheduled_time": data.scheduled_time # logic: This is the missing piece!
        })
        db.commit()
        return {"message": "Task posted successfully"}
    except Exception as e:
        db.rollback()
        # logic: This helps you see the error in your Render logs
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Database insertion failed")

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
