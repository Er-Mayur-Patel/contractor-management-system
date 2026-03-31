from fastapi import APIRouter, Depends, HTTPException
from fastapi_utils.cbv import cbv
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.utils.auth import verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@cbv(router)
class AuthView:

    db: Session = Depends(get_db)

    @router.post("/login")
    def login(self, data: dict):

        user = self.db.query(User).filter(
            User.email == data.get("email")
        ).first()

        if not user:
            raise HTTPException(status_code=400, detail="User not found")

        if not verify_password(data.get("password"), user.password):
            raise HTTPException(status_code=400, detail="Wrong password")

        token = create_token({"user_id": user.id})

        return {
            "access_token": token,
            "token_type": "bearer"
        }