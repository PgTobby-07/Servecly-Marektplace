from pydantic import BaseModel

class TaskCreate(BaseModel):
    categoryId: int
    title: str
    description: str
    location: str
    budget: float
    service_id: int
    client_id: int
    scheduled_time: str # change: Add this field here
