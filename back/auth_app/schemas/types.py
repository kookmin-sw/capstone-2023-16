# types.py
import strawberry
from strawberry import auto

from auth_app import models


@strawberry.django.type(models.User)
class User:
    id: auto
    username: auto
