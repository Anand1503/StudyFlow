from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, dashboard, courses, attendance, assessments, certificates

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with proper prefixes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["attendance"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(certificates.router, prefix="/api/certificates", tags=["certificates"])

@app.get("/")
def root():
    return {"message": "StudyFlow API is running"} 