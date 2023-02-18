from functools import wraps
from typing import List

import strawberry
from strawberry import Schema
from strawberry.tools import merge_types
from strawberry.types import Info

from .user import Mutation as UserMutation


def requires_auth(resolver):
    @wraps(resolver)
    def auth_wrapper(*args, **kwargs):
        if not kwargs['info'].context.request.user.is_authenticated:
            raise AttributeError("auth required")
        return resolver(args, kwargs)

    return auth_wrapper


@requires_auth
def sample_query_resolver(self, info: Info):
    return [
        "A",
    ]


@strawberry.type
class Query:
    books: List[str] = strawberry.field(resolver=sample_query_resolver)


mutations = (UserMutation,)

Mutation = merge_types("Mutation", mutations)

schema = Schema(mutation=Mutation, query=Query)
