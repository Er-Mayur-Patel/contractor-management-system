from pydantic import BaseModel
from typing import Optional


class SiteBase(BaseModel):
    name: str
    location: Optional[str]
    total_sqft: Optional[float]


class SiteResponse(SiteBase):
    id: int
    site_image: Optional[str]
    elevation_image: Optional[str]
    centerline_plan: Optional[str]
    other_plan: Optional[str]

    class Config:
        orm_mode = True