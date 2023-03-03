from functools import wraps

from strawberry.types import Info

from graphql_app.types.errors import AuthInfoRequiredError, AdminPermissionRequiredError, AnonymousOnlyError


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
