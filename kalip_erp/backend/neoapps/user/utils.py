import jwt
from django.conf import settings
import time

def generate_token(user):
    return jwt.encode({"id": user.id, "firstName": user.first_name, "lastName": user.last_name, "mobile": user.mobile, "exp": time.time() + 360*60}, settings.SECRET_KEY, algorithm="HS256")

def verify_token(token):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])