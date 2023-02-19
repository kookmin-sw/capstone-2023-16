import strawberry

from auth_app.models import User
from django.contrib.auth import authenticate, login
from strawberry.types.info import Info
from .types import User as UserType


@strawberry.type
class PostCreateSuccess:
    user: UserType


@strawberry.type
class PostCreateError:
    message: str


PostCreateResult = strawberry.union("PostCreateResult", (PostCreateSuccess, PostCreateError))


@strawberry.type
class Mutation:
    @strawberry.mutation
    def post_create(self, info: Info, title: str, content: str) -> PostCreateResult:
        pass
    