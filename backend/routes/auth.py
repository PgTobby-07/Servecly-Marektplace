from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.auth_models import LoginRequest, SignupRequest
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(tags=["Authentication"])
# Settings for the token
SECRET_KEY = "praise_god_tobby_secret_key" # Keep this secret!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # Token lasts 24 hours
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
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

    # CREATE THE REAL TOKEN
    access_token = create_access_token(data={"sub": str(result[0])})

    return {
        "token": access_token,
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
