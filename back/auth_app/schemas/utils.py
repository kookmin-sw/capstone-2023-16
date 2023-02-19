from functools import wraps


def requires_auth(resolver):
    @wraps(resolver)
    def auth_wrapper(*args, **kwargs):
        if not kwargs['info'].context.request.user.is_authenticated:
            raise AttributeError("auth required")
        return resolver(args, kwargs)

    return auth_wrapper
