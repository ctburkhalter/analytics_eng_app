from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from backend.db.database import SessionLocal, engine, Base  # Correct imports
from backend.models.db_models import Anchor, Category

# Create database tables if they don't already exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Router setup
dbt_router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@dbt_router.post("/admin/anchors/")
def create_anchor(name: str, description: str, value: str, category_id: int, db: Session = Depends(get_db)):
    anchor = Anchor(name=name, description=description, value=value, category_id=category_id)
    db.add(anchor)
    db.commit()
    db.refresh(anchor)
    return anchor

@dbt_router.get("/admin/anchors/")
def get_anchors(db: Session = Depends(get_db), category_id: int = None):
    if category_id:
        return db.query(Anchor).filter(Anchor.category_id == category_id).all()
    return db.query(Anchor).all()

@dbt_router.put("/admin/anchors/{anchor_id}")
def update_anchor(anchor_id: int, name: str, description: str, value: str, category_id: int, db: Session = Depends(get_db)):
    anchor = db.query(Anchor).filter(Anchor.id == anchor_id).first()
    if not anchor:
        raise HTTPException(status_code=404, detail="Anchor not found")
    anchor.name = name
    anchor.description = description
    anchor.value = value
    anchor.category_id = category_id
    db.commit()
    db.refresh(anchor)
    return anchor

@dbt_router.delete("/admin/anchors/{anchor_id}")
def delete_anchor(anchor_id: int, db: Session = Depends(get_db)):
    anchor = db.query(Anchor).filter(Anchor.id == anchor_id).first()
    if not anchor:
        raise HTTPException(status_code=404, detail="Anchor not found")
    db.delete(anchor)
    db.commit()
    return {"message": "Anchor deleted successfully"}

@dbt_router.post("/admin/categories/")
def create_category(name: str, db: Session = Depends(get_db)):
    category = Category(name=name)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@dbt_router.get("/admin/categories/")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@dbt_router.put("/admin/categories/{category_id}")
def update_category(category_id: int, name: str, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    category.name = name
    db.commit()
    db.refresh(category)
    return category

@dbt_router.delete("/admin/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()
    return {"message": "Category deleted successfully"}

# Include the dbt_router in the main FastAPI application
app.include_router(dbt_router, prefix="/dbt")
