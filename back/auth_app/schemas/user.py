import strawberry

from auth_app.models import User
from django.contrib.auth import authenticate, login
from strawberry.types.info import Info
from .types import User as UserType


@strawberry.type
class LoginSuccess:
    user: UserType


@strawberry.type
class LoginError:
    message: str


LoginResult = strawberry.union("LoginResult", (LoginSuccess, LoginError))


@strawberry.type
class UserResponse:
    username: str


@strawberry.type
class Mutation:
    @strawberry.mutation
    def register_or_login(self, info: Info, username: str, email: str, password: str) -> LoginResult:
        if not User.objects.filter(email=email).exists():
            user = User.objects.create(username=username, email=email, password=password)
            user.set_password(password)
            user.save()

        user = authenticate(email=email, password=password)
        if not user:
            return LoginError(message="Something wrong")

        login(info.context.request, user)
        return LoginSuccess(user=UserType(username=user.username))
