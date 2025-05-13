from .database import SessionLocal, Base, engine
from .models import user as user_model
from .utils.auth import get_password_hash

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def init_db():
    db = SessionLocal()
    try:
        # Check if test user exists
        test_user = db.query(user_model.User).filter(user_model.User.email == "test@example.com").first()
        if not test_user:
            # Create test user
            test_user = user_model.User(
                email="test@example.com",
                hashed_password=get_password_hash("test123"),
                full_name="Test User",
                degree="B.Tech",
                branch="CSE",
                year="3rd Year"
            )
            db.add(test_user)
            db.commit()
            print("Test user created successfully!")
        else:
            print("Test user already exists!")
    finally:
        db.close()

if __name__ == "__main__":
    init_db() 