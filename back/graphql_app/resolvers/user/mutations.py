import strawberry
from django.contrib.auth import login, logout
from django.db.models import Q
from strawberry.types.info import Info

from graphql_app.models import User as UserModel
from graphql_app.resolvers.decorators import anonymous_only, requires_auth
from graphql_app.resolvers.errors import AnonymousOnlyError
from graphql_app.resolvers.model_types import User
from graphql_app.resolvers.user.errors import UsernameAlreadyUsedError, WrongCertInfoError, EmailAlreadyUsedError


@strawberry.type
class Mutation:
    @strawberry.mutation
    @anonymous_only
    def register(self, info: Info, username: str, email: str, password: str) \
            -> strawberry.union("RegisterOrLoginResult", (User,
                                                          AnonymousOnlyError,
                                                          UsernameAlreadyUsedError, EmailAlreadyUsedError)):
        """
        username, email, password로 회원 가입을 시도한다.
        단, username, email은 각각 Unique하다.
        """
        duplicated_users = UserModel.objects.filter(
            Q(username=username) | Q(email=email))
        # 해당 username 또는 email을 사용하는 사용자가 있는 경우 오류 발생
        if duplicated_users:
            # username 중복
            if duplicated_users.filter(username=username).exists():
                raise UsernameAlreadyUsedError(username)
            # email 중복
            elif duplicated_users.filter(email=email).exists():
                raise EmailAlreadyUsedError(email)
        # 유효한 정보인 경우 회원 가입 수행
        else:
            user = UserModel.objects.create(username=username, email=email)
            user.set_password(password)
            user.save()
            return user

    @strawberry.mutation
    @anonymous_only
    def login(self, info: Info, username: str, password: str) \
            -> strawberry.union("LoginResult", (User,
                                                AnonymousOnlyError,
                                                WrongCertInfoError)):
        """
        username과 password로 로그인을 시도한다.
        """
        user = UserModel.objects.get(username=username)
        # 비밀번호 불일치
        if not user.check_password(password):
            raise WrongCertInfoError()
        # 로그인 성공
        else:
            login(info.context.request, user)
            return user

    @strawberry.mutation
    @requires_auth
    def logout(self, info: Info) -> None:
        logout(info.context.request)
