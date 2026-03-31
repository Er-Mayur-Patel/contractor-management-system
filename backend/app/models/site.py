from sqlalchemy import Column, Integer, String, Table, ForeignKey, Float, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

site_worker = Table(
    "site_worker",
    Base.metadata,
    Column("site_id", Integer, ForeignKey("sites.id")),
    Column("worker_id", Integer, ForeignKey("workers.id"))
)

class Site(Base):
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    location = Column(String(255))
    total_sqft = Column(Float)

    site_image = Column(String(255))
    elevation_image = Column(String(255))
    centerline_plan = Column(String(255))
    other_plan = Column(String(255))

    workers = relationship("Worker", secondary=site_worker, back_populates="sites")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())