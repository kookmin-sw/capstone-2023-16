from typing import Optional, Iterable

import strawberry

from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay


@strawberry.type
class PostCreateSuccess:
    post: str


@strawberry.type
class PostCreateError:
    message: str


PostCreateResult = strawberry.union("PostCreateResult", (PostCreateSuccess, PostCreateError))


@gql.type
class Post(relay.Node):
    name: str

    def resolve_node(self, node_id: str, info: Optional[Info] = None, required=False):
        pass

    def resolve_nodes(self, info: Optional[Info] = None, node_ids: Optional[Iterable[str]] = None):
        pass


@gql.type
class Query:
    post: Optional[Post] = relay.node()
    posts_connection: relay.Connection[Post] = relay.connection()

    @relay.connection
    def fruits_connection_filtered(self, name_startswith: str) -> Iterable[Post]:
        # Note that this resolver is special. It should not resolve the connection, but
        # the iterable of nodes itself. Thus, any arguments defined here will be appended
        # to the query, and the pagination of the iterable returned here will be
        # automatically handled.
        pass


@strawberry.type
class Mutation:
    @strawberry.mutation
    def post_create(self, info: Info, title: str, content: str) -> PostCreateResult:
        pass
