from pydantic import BaseModel
from datetime import datetime

class BookingCreate(BaseModel):
    taskId: int
    taskerId: int
    scheduledAt: datetime
