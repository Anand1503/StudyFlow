from pydantic import BaseModel

class UserLogin(BaseModel):
    roll_number: str
    password: str 