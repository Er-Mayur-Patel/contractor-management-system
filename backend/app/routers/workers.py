from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.worker import Worker
from app.schemas.worker import WorkerCreate

router = APIRouter(prefix="/workers", tags=["Workers"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@cbv(router)
class WorkerView:

    db: Session = Depends(get_db)

    @router.post("/")
    def create_worker(self, worker: WorkerCreate):

        new_worker = Worker(
            name=worker.name,
            phone=worker.phone,
            hourly_rate=worker.hourly_rate
        )

        self.db.add(new_worker)
        self.db.commit()
        self.db.refresh(new_worker)

        return new_worker


    @router.get("/")
    def list_workers(self):

        return self.db.query(Worker).all()


    @router.get("/{worker_id}")
    def get_worker(self, worker_id: int):

        return self.db.query(Worker).filter(
            Worker.id == worker_id
        ).first()


    @router.delete("/{worker_id}")
    def delete_worker(self, worker_id: int):

        worker = self.db.query(Worker).filter(
            Worker.id == worker_id
        ).first()

        self.db.delete(worker)
        self.db.commit()

        return {"message": "Worker deleted"}