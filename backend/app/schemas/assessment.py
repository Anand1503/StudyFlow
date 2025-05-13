from pydantic import BaseModel

class Assessment(BaseModel):
    id: int
    subject: str
    title: str
    description: str
    deadline: str
    submitted: bool 