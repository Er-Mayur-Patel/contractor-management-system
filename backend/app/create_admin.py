from database import SessionLocal
from models.user import User
from utils.auth import hash_password

db = SessionLocal()

email = "admin@gmail.com"
password = "admin"

existing = db.query(User).filter(User.email == email).first()

if existing:
    print("Admin already exists")
else:
    admin = User(
        email=email,
        password=hash_password(password)
    )

    db.add(admin)
    db.commit()

    print("Admin created successfully ✅")

db.close()