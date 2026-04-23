# =========================
# booking_models.py
# (No logic issue, only cleaned types)
# =========================

from pydantic import BaseModel
from datetime import datetime


class BookingCreate(BaseModel):
    taskId: int
    taskerId: int

    # CHANGE: Keep datetime validation
    scheduledAt: datetime
