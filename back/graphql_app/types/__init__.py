from strawberry import Schema
from strawberry.tools import merge_types
from strawberry_django_plus.directives import SchemaDirectiveExtension

from .extensions import ExtendErrorFormat
from .post import Mutation as PostMutation
from .post import Query as PostQuery
from .user import Mutation as UserMutation
from .persona import Mutation as PersonaMutation
from .persona import Query as PersonaQuery

queries = (PostQuery, PersonaQuery)
mutations = (UserMutation, PostMutation, PersonaMutation)

Query = merge_types("Query", queries)
Mutation = merge_types("Mutation", mutations)

schema = Schema(mutation=Mutation, query=Query, extensions=[SchemaDirectiveExtension, ExtendErrorFormat])
