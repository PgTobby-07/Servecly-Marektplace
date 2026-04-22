@router.post("/signup", status_code=201)
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    try:
        # 1. Prepare name parts for the database
        name_parts = data.name.split(" ", 1)
        first = name_parts[0]
        last = name_parts[1] if len(name_parts) > 1 else ""
        
        # 2. Find the Role ID based on the string sent from frontend ('users' or 'taskers')
        # logic: Fetching the role row to ensure we have a valid role_id
        role_result = db.execute(text("SELECT role_id FROM roles WHERE role_name = :role"), 
                                 {"role": data.role}).fetchone()
        
        if not role_result:
            return {"error": f"Role '{data.role}' not found in database"}

        # 3. Create the entry in the 'users' table
        # change: We include 'is_active' to match your database schema
        db.execute(text("""
            INSERT INTO users (first_name, last_name, email, password_hash, role_id, is_active)
            VALUES (:first, :last, :email, :password, :role_id, 1)
        """), {
            "first": first, "last": last, "email": data.email,
            "password": data.password, "role_id": role_result[0]
        })

        # 4. Get the ID of the user we just inserted
        # logic: This ID is required to link the client/tasker table
        user_id = db.execute(text("SELECT LAST_INSERT_ID()")).scalar()

        # 5. Create the profile in the specific table (client or tasker)
        # logic: Using .lower() and .strip() to handle 'users' vs 'user'
        role_name_clean = data.role.lower().strip()
        
        if role_name_clean in ["user", "users"]:
            db.execute(text("""
                INSERT INTO client (client_id, name, email)
                VALUES (:id, :name, :email)
            """), {"id": user_id, "name": data.name, "email": data.email})

        elif role_name_clean in ["tasker", "taskers"]:
            db.execute(text("""
                INSERT INTO tasker (tasker_id, name, email)
                VALUES (:id, :name, :email)
            """), {"id": user_id, "name": data.name, "email": data.email})

        # 6. 🔥 THE MOST IMPORTANT STEP: Commit the transaction
        # This makes the user permanent. Without this, the database rolls back on error.
        db.commit()

        return {
            "message": "User registered successfully",
            "userId": user_id
        }

    except Exception as e:
        # logic: If ANY of the above fails, undo everything so we don't have broken data
        db.rollback() 
        print(f"Signup Error: {str(e)}") 
        return {"error": "Internal Server Error", "details": str(e)}
