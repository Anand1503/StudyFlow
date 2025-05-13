from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from ..database import get_connection

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/{student_id}")
def get_dashboard(student_id: int, token: str = Depends(oauth2_scheme)):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Get student info
    cursor.execute("SELECT * FROM users WHERE id=%s", (student_id,))
    student = cursor.fetchone()
    if not student:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Student not found")
    
    # Get enrolled courses
    cursor.execute("""
        SELECT c.* 
        FROM courses c 
        INNER JOIN enrollments e ON c.id = e.course_id 
        WHERE e.student_id = %s
    """, (student_id,))
    courses = cursor.fetchall()
    
    # Get overall attendance
    cursor.execute("""
        SELECT AVG(percentage) as overall_attendance 
        FROM attendance 
        WHERE student_id = %s
    """, (student_id,))
    attendance = cursor.fetchone()
    
    # Get upcoming assessments
    cursor.execute("""
        SELECT a.*, c.title as course_title 
        FROM assessments a 
        INNER JOIN courses c ON a.course_id = c.id 
        WHERE a.student_id = %s 
        AND a.deadline >= CURDATE() 
        AND a.submitted = 0
        ORDER BY a.deadline ASC
    """, (student_id,))
    assessments = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return {
        "student": {
            "name": student["full_name"],
            "degree": student["degree"],
            "branch": student["branch"],
            "year": student["year"],
            "cgpa": float(student["cgpa"]) if student["cgpa"] else 0.0
        },
        "current_courses": courses,
        "overall_attendance": float(attendance["overall_attendance"]) if attendance["overall_attendance"] else 0.0,
        "upcoming_assessments": assessments
    } 