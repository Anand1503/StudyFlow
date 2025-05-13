from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from ..database import get_connection

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/{student_id}")
def get_attendance(student_id: int, token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT subject, total_periods, attended_periods, percentage FROM attendance WHERE student_id=%s", (student_id,))
    records = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"attendance": records} 