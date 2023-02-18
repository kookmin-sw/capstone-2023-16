import typing

import strawberry
from strawberry import Schema
from strawberry.tools import merge_types


from .user import Mutation as UserMutation


@strawberry.type
class Query:
    name: str


mutations = (UserMutation,)

Mutation = merge_types("Mutation", mutations)

schema = Schema(mutation=Mutation, query=Query)
