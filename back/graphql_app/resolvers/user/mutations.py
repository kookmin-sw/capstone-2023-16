import strawberry
from strawberry.types.info import Info

from graphql_app.domain.user.core import create_user, find_user, login, logout
from graphql_app.domain.user.exceptions import UsernameDuplicationException, EmailDuplicationException, \
    WrongCertInfoException
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
        try:
            user = create_user(username, email, password)
        except UsernameDuplicationException:
            raise UsernameAlreadyUsedError(username)
        except EmailDuplicationException:
            raise EmailAlreadyUsedError(email)
        else:
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
        try:
            user = find_user(username, password)
        # 비밀번호 불일치
        except WrongCertInfoException:
            raise WrongCertInfoError()
        # 로그인 성공
        else:
            login(info.context.request, user)
            return user

    @strawberry.mutation
    @requires_auth
    def logout(self, info: Info) -> None:
        """
        로그아웃을 수행한다.
        """
        logout(info.context.request)
