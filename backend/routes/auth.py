from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from config.database import get_db
from models.auth_models import LoginRequest, SignupRequest
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(tags=["Authentication"])

SECRET_KEY = "praise_god_tobby_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    result = db.execute(text("""
        SELECT u.user_id, u.first_name, u.last_name, u.password_hash, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = :email
    """), {"email": data.email}).fetchone()

    if not result:
        raise HTTPException(status_code=401, 
            detail="Invalid Credentials",
            headers={"X-Error": "There was a problem"})
        #return {"error": "Invalid credentials"}

    stored_password = result[3]

    if data.password != stored_password:
        raise HTTPException(
        status_code=401,
        detail="Invalid Credentials"
    )
        #return {"error": "Invalid credentials"}

    access_token = create_access_token(data={"sub": str(result[0])})

    return {
        "token": access_token,
        "user": {
            "id": result[0],
            "name": result[1] + " " + result[2],
            "role": result[4]
        }
    }


@router.post("/signup", status_code=201)
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    try:
        name_parts = data.name.split(" ", 1)
        first = name_parts[0]
        last = name_parts[1] if len(name_parts) > 1 else ""

        role = db.execute(text("SELECT role_id FROM roles WHERE role_name = :role"), 
                          {"role": data.role}).fetchone()

        if not role:
            return {"error": "Invalid role"}

        db.execute(text("""
            INSERT INTO users (first_name, last_name, email, password_hash, role_id)
            VALUES (:first, :last, :email, :password, :role_id)
        """), {
            "first": first, "last": last, "email": data.email,
            "password": data.password, "role_id": role[0]
        })

        user_id = db.execute(text("SELECT LAST_INSERT_ID()")).scalar()

        role_name_clean = data.role.lower().strip()

        if role_name_clean in ["user", "users"]:
            db.execute(text("INSERT INTO client (client_id) VALUES (:id)"), {"id": user_id})

        elif role_name_clean in ["tasker", "taskers"]:
            db.execute(text("INSERT INTO tasker (tasker_id) VALUES (:id)"), {"id": user_id})

        db.commit()

        return {
            "message": "User registered successfully",
            "token": create_access_token(data={"sub": str(user_id)}),
            "user": {
                "id": user_id,
                "name": data.name,
                "role": data.role
            }
        }

    except Exception as e:
        db.rollback()
        print(f"Signup Error: {str(e)}")
        return {"error": "Internal Server Error", "details": str(e)}
