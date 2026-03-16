from fastapi import APIRouter
from app.core.security import create_access_token

router = APIRouter()

fake_user = {
    "email": "admin@test.com",
    "password": "123456"
}

@router.post("/login")
def login(data: dict):

    if data["email"] == fake_user["email"] and data["password"] == fake_user["password"]:

        token = create_access_token({"email": data["email"]})

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    return {"error": "Invalid credentials"}