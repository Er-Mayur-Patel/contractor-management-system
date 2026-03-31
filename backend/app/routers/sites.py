import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form, Depends
from fastapi_utils.cbv import cbv
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.site import Site
from app.schemas.site import SiteResponse

router = APIRouter(prefix="/sites", tags=["Sites"])

UPLOAD_DIR = "uploads/sites"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_file(file: UploadFile | None):
    if not file:
        return None
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(file.file.read())

    return filepath


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@cbv(router)
class SiteView:
    db: Session = Depends(get_db)

    @router.post("/", response_model=SiteResponse)
    def create_site(
        self,
        name: str = Form(...),
        location: str = Form(None),
        total_sqft: float = Form(None),

        site_image: UploadFile = File(None),
        elevation_image: UploadFile = File(None),
        centerline_plan: UploadFile = File(None),
        other_plan: UploadFile = File(None),
    ):
        new_site = Site(
            name=name,
            location=location,
            total_sqft=total_sqft,
            site_image=save_file(site_image),
            elevation_image=save_file(elevation_image),
            centerline_plan=save_file(centerline_plan),
            other_plan=save_file(other_plan),
        )

        self.db.add(new_site)
        self.db.commit()
        self.db.refresh(new_site)
        return new_site

    @router.get("/", response_model=list[SiteResponse])
    def list_sites(self):
        return self.db.query(Site).all()

    @router.get("/{site_id}", response_model=SiteResponse)
    def get_site(self, site_id: int):
        return self.db.query(Site).filter(Site.id == site_id).first()

    @router.put("/{site_id}", response_model=SiteResponse)
    def update_site(
        self,
        site_id: int,
        name: str = Form(...),
        location: str = Form(None),
        total_sqft: float = Form(None),

        site_image: UploadFile = File(None),
        elevation_image: UploadFile = File(None),
        centerline_plan: UploadFile = File(None),
        other_plan: UploadFile = File(None),
    ):
        site = self.db.query(Site).filter(Site.id == site_id).first()

        site.name = name
        site.location = location
        site.total_sqft = total_sqft

        if site_image:
            site.site_image = save_file(site_image)
        if elevation_image:
            site.elevation_image = save_file(elevation_image)
        if centerline_plan:
            site.centerline_plan = save_file(centerline_plan)
        if other_plan:
            site.other_plan = save_file(other_plan)

        self.db.commit()
        self.db.refresh(site)
        return site

    @router.delete("/{site_id}")
    def delete_site(self, site_id: int):
        site = self.db.query(Site).filter(Site.id == site_id).first()
        self.db.delete(site)
        self.db.commit()
        return {"message": "Site deleted successfully"}