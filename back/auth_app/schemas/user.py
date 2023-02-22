import strawberry
from strawberry.types.info import Info
from django.contrib.auth import authenticate, login
from django.db import IntegrityError

from auth_app.models import User
from common_app.schemas.types import MutationError

from .types import User as UserType


@strawberry.type
class LoginSuccess:
    """
    로그인에 성공했을 경우에 대한 응답
    """
    user: UserType = strawberry.field(description='로그인한 사용자의 정보')


@strawberry.interface
class LoginError(MutationError):
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


@strawberry.interface
class RegisterError(MutationError):
    """
    회원 가입 관련 에러
    """
    pass


@strawberry.type
class UsernameAlreadyUsedError(RegisterError):
    """
    이미 사용 중인 username으로 회원 가입을 시도하려는 경우
    """
    message: str = 'Given username is already used.'
    code: int = 1


RegisterOrLoginResult = strawberry.union("RegisterOrLoginResult", (LoginSuccess,
                                                                   WrongCertInfoError, UsernameAlreadyUsedError))


@strawberry.type
class Mutation:
    @strawberry.mutation
    def register_or_login(self, info: Info, username: str, email: str, password: str) -> RegisterOrLoginResult:
        """
        이미 존재하는 사용자 정보인 경우 username과 password로 로그인을 시도하고,
        존재하지 않는 사용자 정보인 경우 username, email, password로 회원 가입하여 로그인을 시도한다.
        단, username, email은 각각 Unique하다.
        """
        if not User.objects.filter(email=email).exists():
            try:
                user = User.objects.create(username=username, email=email)
            # 새 email이지만, 이미 사용 중인 username인 경우
            except IntegrityError:
                return UsernameAlreadyUsedError()
            # email과 username 둘 다 문제 없는 경우
            else:
                user.set_password(password)
                user.save()

        user = authenticate(email=email, password=password)
        if not user:
            return WrongCertInfoError()
        else:
            login(info.context.request, user)
            return LoginSuccess(user=UserType(username=user.username))
