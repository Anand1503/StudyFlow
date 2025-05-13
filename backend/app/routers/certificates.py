from fastapi import APIRouter, Depends, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer
from ..database import get_connection
from ..utils.file_upload import save_upload_file

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/{student_id}")
def get_certificates(student_id: int, token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM certificates WHERE student_id=%s", (student_id,))
    certificates = cursor.fetchall()
    cursor.close()
    conn.close()
    return {"certificates": certificates}

@router.post("/")
def upload_certificate(
    student_id: int = Form(...),
    title: str = Form(...),
    provider: str = Form(...),
    duration: str = Form(...),
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme)
):
    file_path = save_upload_file(file, "certificates")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO certificates (student_id, title, provider, duration, file_path) VALUES (%s, %s, %s, %s, %s)",
        (student_id, title, provider, duration, file_path)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"success": True, "file_path": file_path} 