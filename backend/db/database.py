# backend/db/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL for SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./analytics.db"

# Create the engine and session maker
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define the base class for the models
Base = declarative_base()
