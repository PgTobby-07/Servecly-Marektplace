from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db

router = APIRouter(tags=["Admin"])

@router.get("/vetting/pending")
def pending(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT * FROM VettingRequest WHERE vetting_status_id = 1
    """)).fetchall()

    return [dict(row._mapping) for row in result]

@router.patch("/vetting/{userId}")
def update(userId: int, body: dict, db: Session = Depends(get_db)):
    db.execute(text("""
        UPDATE VettingRequest
        SET vetting_status_id = (
            SELECT vetting_status_id FROM VettingStatus WHERE name = :status
        )
        WHERE tasker_id = :userId
    """), {"status": body["status"], "userId": userId})

    db.commit()
    return {"message": "Updated"}
