from fastapi import APIRouter, Depends, HTTPException  # change: Added HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.task_models import TaskCreate

router = APIRouter(tags=["Tasks"])

@router.post("")
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    try:
        # logic: Indented the following lines to be inside the try block
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
            "status": "open"  # logic: Added a default status so the column isn't null
        })
        db.commit()
        return {"message": "Task posted successfully"}
    except Exception as e:
        db.rollback()
        # logic: This is vital! Check your Render "Logs" tab to see exactly what 'e' says.
        print(f"Database Error: {e}") 
        raise HTTPException(status_code=500, detail=f"Database insertion failed: {str(e)}")
