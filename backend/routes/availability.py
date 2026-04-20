from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.availability_models import AvailabilityCreate

router = APIRouter(tags=["Availability"])

@router.get("/taskers/{userId}/availability")
def get_availability(userId: int, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT * FROM Availability WHERE tasker_id = :id
    """), {"id": userId}).fetchall()

    return [dict(row._mapping) for row in result]

@router.post("/availability")
def add(data: AvailabilityCreate, db: Session = Depends(get_db)):
    db.execute(text("""
        INSERT INTO Availability (tasker_id, available_date, start_time, end_time)
        VALUES (:tasker_id, :available_date, :start_time, :end_time)
    """), data.dict())

    db.commit()
    return {"message": "Availability updated"}
