from functools import wraps

from strawberry.types import Info

from graphql_app.permissions import has_persona_context
from graphql_app.resolvers.errors import AuthInfoRequiredError, AdminPermissionRequiredError, AnonymousOnlyError, \
    CookieContextRequiredError


def requires_auth(resolver):
    """
    로그인한 사용자가 아닌 경우 AuthInfoRequiredError를 발생시키는 decorator
    strawberry decorator 아래에 사용한다.
    """

    @wraps(resolver)
    def wrapper(self, info: Info, *args, **kwargs):
        if not info.context.request.user.is_authenticated:
            raise AuthInfoRequiredError()
        else:
            return resolver(self, info, *args, **kwargs)

    return wrapper


def admin_only(resolver):
    """
    Admin이 아닌 경우 AdminPermissionRequiredError를 발생시킴
    strawberry decorator 아래에 사용한다.
    """

    @wraps(resolver)
    def wrapper(self, info: Info, *args, **kwargs):
        if not info.context.request.user.is_authenticated:
            raise AuthInfoRequiredError()
        elif not info.context.request.user.is_staff:
            raise AdminPermissionRequiredError()
        else:
            return resolver(self, info, *args, **kwargs)

    return wrapper


def anonymous_only(resolver):
    """
    로그인한 사용자인 경우 AnonymousOnlyError 발생시킴
    strawberry decorator 아래에 사용한다.
    """

    @wraps(resolver)
    def wrapper(self, info: Info, *args, **kwargs):
        if info.context.request.user.is_authenticated:
            raise AnonymousOnlyError()
        else:
            return resolver(self, info, *args, **kwargs)

    return wrapper


def requires_persona_context(resolver):
    """
    Cookie에 persona_id를 가지고 있고, 이에 대응하는 페르소나가 존재하며, 해당 페르소나의 소유주인 경우 통과시킴
    strawberry decorator 아래에 사용한다.
    """

    @wraps(resolver)
    def wrapper(self, info: Info, *args, **kwargs):
        print(info.context.request.COOKIES)
        if not has_persona_context(info.context.request):
            raise CookieContextRequiredError('persona_id')
        else:
            return resolver(self, info, *args, **kwargs)

    return wrapper
