from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db

router = APIRouter(tags=["Services"])

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    # CHANGE: Switched count from taskers to service_id so sidebar numbers reflect 
    # the services we just added (e.g., [1] for Shelving)
    result = db.execute(text("""
        SELECT c.category_id as id, c.name,
        COUNT(s.service_id) as taskerCount
        FROM Category c
        LEFT JOIN Service s ON c.category_id = s.category_id
        GROUP BY c.category_id, c.name
        ORDER BY c.name ASC
    """)).fetchall()

    return [dict(row._mapping) for row in result]

@router.get("/search")
def search_services(q: str = "", db: Session = Depends(get_db)):
    search_query = f"%{q}%"
    
    # CHANGE: Added a JOIN with Category table to retrieve 'category_name' for the TaskCard
    results = db.execute(text("""
        SELECT s.service_id as id, s.title, s.description, 
               s.base_price as price, c.name as category_name
        FROM Service s
        JOIN Category c ON s.category_id = c.category_id
        WHERE (s.title LIKE :q OR s.description LIKE :q)
        AND s.is_active = 1
    """), {"q": search_query}).fetchall()
    
    return [dict(row._mapping) for row in results]
