from pydantic import BaseModel

class VettingUpdate(BaseModel):
    status: str
