# types.py
import strawberry
from strawberry import auto

from auth_app import models


@strawberry.django.type(models.User)
class User:
    id: auto
    username: auto = strawberry.field(description="사용자 ID (Unique)")


@strawberry.django.type(models.Post)
class Post:
    id: auto
    title: auto = strawberry.field(description="글 제목")
    content: auto = strawberry.field(description="글 내용")
