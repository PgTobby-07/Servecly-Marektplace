from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.booking_models import BookingCreate

router = APIRouter(tags=["Bookings"])

@router.post("")
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    db.execute(text("""
        INSERT INTO Booking (task_id, tasker_id, scheduled_time, booking_status_id)
        VALUES (:taskId, :taskerId, :scheduledAt, 1)
    """), data.dict())

    db.commit()
    return {"message": "Booking created"}

@router.get("")
def get_bookings(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT * FROM Booking")).fetchall()
    return [dict(row._mapping) for row in result]
