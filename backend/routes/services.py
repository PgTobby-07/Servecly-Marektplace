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

@router.get("/search")
def search_services(q: str, db: Session = Depends(get_db)):
    # The % symbols allow it to find partial matches (e.g., "clean" finds "Cleaning")
    search_query = f"%{q}%"
    
    results = db.execute(text("""
        SELECT service_id, title, description, price 
        FROM services 
        WHERE title LIKE :q OR description LIKE :q
    """), {"q": search_query}).fetchall()
    
    return [dict(row) for row in results]
