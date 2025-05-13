from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.security import OAuth2PasswordBearer
from ..database import get_connection
from ..utils.file_upload import save_upload_file

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/{student_id}")
def get_assessments(student_id: int, subject: str = None, token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    if subject:
        cursor.execute("SELECT * FROM assessments WHERE student_id=%s AND subject=%s", (student_id, subject))
    else:
        cursor.execute("SELECT * FROM assessments WHERE student_id=%s", (student_id,))
    assessments = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"assessments": assessments}

@router.post("/{assessment_id}/submit")
def submit_assessment(assessment_id: int, file: UploadFile = File(...), token: str = Depends(oauth2_scheme)):
    file_path = save_upload_file(file, "assessments")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE assessments SET submitted=1, file_path=%s WHERE id=%s", (file_path, assessment_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"success": True, "file_path": file_path} 