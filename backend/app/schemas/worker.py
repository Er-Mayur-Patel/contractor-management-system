from pydantic import BaseModel

class WorkerCreate(BaseModel):
    name: str
    phone: str
    hourly_rate: float

class WorkerResponse(BaseModel):
    id: int
    name: str
    phone: str
    hourly_rate: float

    class Config:
        orm_mode = True