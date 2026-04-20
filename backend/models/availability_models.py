from pydantic import BaseModel
from datetime import date, time

class AvailabilityCreate(BaseModel):
    tasker_id: int
    available_date: date
    start_time: time
    end_time: time
