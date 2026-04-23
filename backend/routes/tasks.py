# =========================
# task.py (FULL UPDATED VERSION)
# =========================

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.task_models import TaskCreate

# CHANGE: import secure logged-in user dependency
from routes.auth import get_current_user

router = APIRouter(tags=["Tasks"])


@router.post("")
def create_task(
    data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        # CHANGE: Only customers/users can post tasks
        if current_user["role"] != "user":
            raise HTTPException(status_code=403, detail="Only customers can create tasks")

        # CHANGE: Never trust frontend client_id
        # Use logged-in user id because client_id = user_id in your schema
        client_id = current_user["id"]

        db.execute(text("""
            INSERT INTO Task (
                client_id,
                category_id,
                service_id,
                title,
                description,
                location,
                budget,
                scheduled_time,
                status
            )
            VALUES (
                :client_id,
                :categoryId,
                :service_id,
                :title,
                :description,
                :location,
                :budget,
                :scheduled_time,
                :status
            )
        """), {
            "client_id": client_id,
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

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# CHANGE: Added secure route for customer dashboard
@router.get("/my")
def get_my_tasks(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        if current_user["role"] != "user":
            raise HTTPException(status_code=403, detail="Only customers can view this")

        result = db.execute(text("""
            SELECT
                task_id,
                title,
                status,
                budget,
                location,
                created_at
            FROM Task
            WHERE client_id = :client_id
            ORDER BY created_at DESC
        """), {
            "client_id": current_user["id"]
        }).fetchall()

        return [dict(row._mapping) for row in result]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Existing general tasks route for taskers/admin if needed
@router.get("")
def get_tasks(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT *
        FROM Task
        ORDER BY created_at DESC
    """)).fetchall()

    return [dict(row._mapping) for row in result]
