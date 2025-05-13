from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from ..database import get_connection

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/{semester}")
def get_courses(semester: str, token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM courses WHERE semester=%s", (semester,))
    courses = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"courses": courses} 