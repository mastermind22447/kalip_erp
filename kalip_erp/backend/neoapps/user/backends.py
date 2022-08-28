from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import User

class NeoBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        # print("---------------------------")
        user = User.nodes.get_or_none(mobile=username)
        # print(username, password)

        try:
            user = User.nodes.get_or_none(mobile=username)
        except User.DoesNotExist:
            return None
        else:
            if check_password(password, user.password):
                return user
        return None
        # print("---------------------------")

    