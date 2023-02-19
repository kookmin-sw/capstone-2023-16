from strawberry import Schema
from strawberry.tools import merge_types
from strawberry_django_plus.directives import SchemaDirectiveExtension

from .post import Mutation as PostMutation
from .post import Query as PostQuery
from .user import Mutation as UserMutation

queries = (PostQuery, )
mutations = (UserMutation, PostMutation)

Query = merge_types("Query", queries)
Mutation = merge_types("Mutation", mutations)

schema = Schema(mutation=Mutation, query=Query, extensions=[SchemaDirectiveExtension])
