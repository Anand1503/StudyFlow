from pydantic import BaseModel

class Attendance(BaseModel):
    subject: str
    total_periods: int
    attended_periods: int
    percentage: float 