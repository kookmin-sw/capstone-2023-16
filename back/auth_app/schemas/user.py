import strawberry

from auth_app.models import User
from django.contrib.auth import authenticate, login
from strawberry.types.info import Info


@strawberry.type
class UserResponse:
    username: str


@strawberry.type
class Mutation:
    @strawberry.mutation
    def register_or_login(self, info: Info, username: str, email: str, password: str) -> bool:
        if not User.objects.filter(email=email).exists():
            user = User.objects.create(username=username, email=email, password=password)
            user.set_password(password)
            user.save()

        user = authenticate(email=email, password=password)
        if not user:
            return False
        login(info.context.request, user)
        return True
