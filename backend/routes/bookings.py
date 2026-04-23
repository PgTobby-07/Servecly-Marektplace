# =========================
# booking.py (FULL UPDATED VERSION)
# =========================

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.booking_models import BookingCreate

# CHANGE: Added secure current user dependency
from routes.auth import get_current_user

router = APIRouter(tags=["Bookings"])


@router.post("")
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        # CHANGE: Only customers can create bookings
        if current_user["role"] != "user":
            raise HTTPException(status_code=403, detail="Only customers can create bookings")

        db.execute(text("""
            INSERT INTO Booking (
                task_id,
                tasker_id,
                scheduled_time,
                booking_status_id
            )
            VALUES (
                :taskId,
                :taskerId,
                :scheduledAt,
                1
            )
        """), data.dict())

        db.commit()

        return {"message": "Booking created"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
def get_bookings(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        # CHANGE: Customers only see bookings linked to THEIR tasks
        if current_user["role"] == "user":

            result = db.execute(text("""
                SELECT 
                    b.booking_id,
                    b.task_id,
                    b.tasker_id,
                    b.scheduled_time,
                    b.booking_status_id,
                    t.title,
                    t.status
                FROM Booking b
                JOIN Task t ON b.task_id = t.task_id
                WHERE t.client_id = :client_id
                ORDER BY b.booking_id DESC
            """), {
                "client_id": current_user["id"]
            }).fetchall()

            return [dict(row._mapping) for row in result]

        # CHANGE: Taskers only see bookings assigned to them
        elif current_user["role"] == "tasker":

            result = db.execute(text("""
                SELECT *
                FROM Booking
                WHERE tasker_id = :tasker_id
                ORDER BY booking_id DESC
            """), {
                "tasker_id": current_user["id"]
            }).fetchall()

            return [dict(row._mapping) for row in result]

        # CHANGE: Admin can see all bookings
        else:
            result = db.execute(text("""
                SELECT *
                FROM Booking
                ORDER BY booking_id DESC
            """)).fetchall()

            return [dict(row._mapping) for row in result]

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
