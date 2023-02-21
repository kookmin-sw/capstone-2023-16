import strawberry

from auth_app.models import User
from common_app.schemas.types import Error
from django.contrib.auth import authenticate, login
from strawberry.types.info import Info
from .types import User as UserType


@strawberry.type
class LoginSuccess:
    user: UserType


@strawberry.interface
class LoginError(Error):
    """
    로그인 관련 에러
    """
    pass


@strawberry.type
class WrongCertInfoError(LoginError):
    """
    잘못된 인증 정보(email, password 등)이 전달 되어 로그인에 실패한 경우
    """
    message: str = 'Wrong certification info.'
    code: int = 1


LoginResult = strawberry.union("LoginResult", (LoginSuccess, WrongCertInfoError))


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
            return WrongCertInfoError()
        else:
            login(info.context.request, user)
            return LoginSuccess(user=UserType(username=user.username))
