from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db

router = APIRouter(tags=["Services"])

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    # This matches your Category and TaskerService tables
    result = db.execute(text("""
        SELECT c.category_id as id, c.name,
        COUNT(ts.tasker_id) as taskerCount
        FROM Category c
        LEFT JOIN Service s ON c.category_id = s.category_id
        LEFT JOIN TaskerService ts ON s.service_id = ts.service_id
        GROUP BY c.category_id, c.name
    """)).fetchall()

    return [dict(row._mapping) for row in result]

@router.get("/search")
def search_services(q: str, db: Session = Depends(get_db)):
    search_query = f"%{q}%"
    
    # Matching your Service table columns: service_id, title, description, base_price
    results = db.execute(text("""
        SELECT service_id as id, title, description, base_price as price
        FROM Service 
        WHERE (title LIKE :q OR description LIKE :q)
        AND is_active = 1
    """), {"q": search_query}).fetchall()
    
    return [dict(row._mapping) for row in results]
