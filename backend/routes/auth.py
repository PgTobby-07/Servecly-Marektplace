from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.auth_models import LoginRequest, SignupRequest

router = APIRouter(tags=["Authentication"])

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT u.user_id, u.first_name, u.last_name, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = :email AND u.password_hash = :password
    """), data.dict()).fetchone()

    if not result:
        return {"error": "Invalid credentials"}

    return {
        "token": "eyJhbG...",
        "user": {
            "id": result[0],
            "name": result[1] + " " + result[2],
            "role": result[3]
        }
    }

@router.post("/signup", status_code=201)
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    name_parts = data.name.split(" ", 1)
    first = name_parts[0]
    last = name_parts[1] if len(name_parts) > 1 else ""
    
    role = db.execute(text("""
        SELECT role_id FROM roles WHERE role_name = :role
    """), {"role": data.role}).fetchone()

    db.execute(text("""
        INSERT INTO users (first_name, last_name, email, password_hash, role_id)
        VALUES (:first, :last, :email, :password, :role_id)
    """), {
        "first": first,
        "last": last,
        "email": data.email,
        "password": data.password,
        "role_id": role[0]
    })

    db.commit()

    user_id = db.execute(text("SELECT LAST_INSERT_ID()")).scalar()

    return {
        "message": "User registered successfully",
        "userId": user_id
    }
