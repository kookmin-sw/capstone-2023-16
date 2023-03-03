import strawberry
from strawberry.types.info import Info
from django.contrib.auth import authenticate, login
from django.db import IntegrityError

from graphql_app.models import User as UserModel
from graphql_app.types.user.errors import UsernameAlreadyUsedError, WrongCertInfoError
from graphql_app.types.model_types import User


@strawberry.type
class Mutation:
    @strawberry.type
    class LoginSuccess:
        """
        로그인에 성공했을 경우에 대한 응답
        """
        user: User = strawberry.field(description='로그인한 사용자의 정보')

    RegisterOrLoginResult = strawberry.union("RegisterOrLoginResult", (LoginSuccess,
                                                                       WrongCertInfoError, UsernameAlreadyUsedError))

    @strawberry.mutation
    def register_or_login(self, info: Info, username: str, email: str, password: str) -> RegisterOrLoginResult:
        """
        이미 존재하는 사용자 정보인 경우 username과 password로 로그인을 시도하고,
        존재하지 않는 사용자 정보인 경우 username, email, password로 회원 가입하여 로그인을 시도한다.
        단, username, email은 각각 Unique하다.
        """
        if not UserModel.objects.filter(email=email).exists():
            try:
                user = UserModel.objects.create(username=username, email=email)
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
            return self.LoginSuccess(user=User(username=user.username))
