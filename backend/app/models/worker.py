from sqlalchemy import Column, Integer, String, Float
from app.database import Base
from sqlalchemy.orm import relationship
from app.models.site import site_worker

class Worker(Base):

    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    hourly_rate = Column(Float)

    sites = relationship("Site", secondary="site_worker", back_populates="workers")