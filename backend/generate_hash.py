from passlib.context import CryptContext

# Create password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Generate hash for password "password123"
password = "password123"
hashed = pwd_context.hash(password)

print(f"Password: {password}")
print(f"Hashed: {hashed}")

# Verify the hash works
print(f"Verification: {pwd_context.verify(password, hashed)}") 