from fastapi import APIRouter, HTTPException
from ..database import get_connection
from ..utils.auth import verify_password, create_access_token
from ..schemas.user import UserLogin

router = APIRouter()

@router.post("/login")
def login(user: UserLogin):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE roll_number=%s", (user.roll_number,))
    db_user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": db_user["roll_number"]})
    return {
        "success": True,
        "data": {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": db_user["id"],
                "roll_number": db_user["roll_number"],
                "full_name": db_user["full_name"],
                "degree": db_user["degree"],
                "branch": db_user["branch"],
                "year": db_user["year"],
                "cgpa": db_user["cgpa"]
            }
        }
    } 