# backend/routers/anchors.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import SessionLocal
from backend.models.db_models import Anchor

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/anchors/")
def read_anchors(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Anchor).offset(skip).limit(limit).all()
