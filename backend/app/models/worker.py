from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Worker(Base):

    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    hourly_rate = Column(Float)