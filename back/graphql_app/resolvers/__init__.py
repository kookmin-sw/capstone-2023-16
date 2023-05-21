from strawberry import Schema
from strawberry.tools import merge_types
from strawberry_django_plus.directives import SchemaDirectiveExtension

from .category.mutations import Mutation as CategoryMutation
from .category.queries import Query as CategoryQuery
from .challenge.mutations import ChallengeMutation
from .challenge.queries import ChallengeQuery
from .extensions import ExtendErrorFormat
from .membership.mutations import Mutation as MembershipMutation
from .membership.queries import Query as MembershipQuery
from .persona.mutations import Mutation as PersonaMutation
from .persona.queries import Query as PersonaQuery
from .post.mutations import Mutation as PostMutation
from .post.queries import Query as PostQuery
from .tag.mutations import Mutation as TagMutation
from .tag.queries import Query as TagQuery
from .user.mutations import Mutation as UserMutation
from .statistics.queries import Query as StatisticsQuery

queries = (PostQuery, PersonaQuery, TagMutation, TagQuery, CategoryQuery, MembershipQuery, StatisticsQuery, ChallengeQuery)
mutations = (UserMutation, PostMutation, PersonaMutation, TagMutation, CategoryMutation, MembershipMutation, ChallengeMutation)

Query = merge_types("Query", queries)
Mutation = merge_types("Mutation", mutations)

schema = Schema(mutation=Mutation, query=Query, extensions=[
    SchemaDirectiveExtension, ExtendErrorFormat])
