from pydantic import BaseModel

class Certificate(BaseModel):
    id: int
    title: str
    provider: str
    duration: str
    file_path: str 