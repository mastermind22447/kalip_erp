import graphql
from neoapps.user.models import User
from django.contrib.auth.hashers import check_password
import re


def validate_login(input):
    errors = {}

    if input.mobile.strip() == '':
        errors["mobile"] = "Mobile must not be empty"

    if input.password.strip() == '':
        errors["password"] = "Password must not be empty"

    return [errors, len(errors) < 1]


def validate_create_user(input):
    errors = {}

    regex = '^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$'

    if input.mobile.strip() == '':
        errors["mobile"] = "Mobile must not be empty"
    # elif (re.search(regex, input.email)) is None:
    #     errors["email"] = "The email address is not valid"
    # elif User.nodes.get_or_none(email=input.email):
    #     errors["email"] = "This email is taken"

    if input.password.strip() == '':
        errors["password"] = "Password must not be empty"
    elif input.password != input.confirm_password:
        errors["confirmPassword"] = "Passwords must match"

    return [errors, len(errors) < 1]