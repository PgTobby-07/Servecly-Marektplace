from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db

router = APIRouter(tags=["Services"])

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT c.category_id as id, c.name,
        COUNT(ts.tasker_id) as taskerCount
        FROM Category c
        LEFT JOIN Service s ON c.category_id = s.category_id
        LEFT JOIN TaskerService ts ON s.service_id = ts.service_id
        GROUP BY c.category_id
    """)).fetchall()

    return [dict(row._mapping) for row in result]
