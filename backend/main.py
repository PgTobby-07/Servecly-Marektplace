from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import auth, services, tasks, bookings, admin, availability

app = FastAPI(title="Servecly API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/v1/auth")
app.include_router(services.router, prefix="/v1/services")
app.include_router(tasks.router, prefix="/v1/tasks")
app.include_router(bookings.router, prefix="/v1/bookings")
app.include_router(admin.router, prefix="/v1/admin")
app.include_router(availability.router, prefix="/v1")
