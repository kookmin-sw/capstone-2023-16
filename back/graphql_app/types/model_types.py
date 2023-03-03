from typing import Optional, Iterable, Type

import strawberry
from strawberry import auto
from strawberry.types.info import Info
from strawberry.utils.await_maybe import AwaitableOrValue
from strawberry_django_plus import gql
from strawberry_django_plus.relay import NodeType
from strawberry_django_plus.gql import relay

from graphql_app import models


# noinspection PyUnresolvedReferences
@strawberry.django.type(models.User)
class User:
    id: auto
    username: auto = strawberry.field(description='사용자 ID (Unique)')


# noinspection PyUnresolvedReferences
@strawberry.django.type(models.Post)
class Post:
    id: auto
    title: auto = strawberry.field(description='글 제목')
    content: auto = strawberry.field(description='글 내용')


@gql.django.type(models.Post)
class PostNode(relay.Node):
    title: str
    content: str

    @classmethod
    def resolve_nodes(cls: Type[NodeType], *,
                      info: Optional[Info] = None, node_ids: Optional[Iterable[str]] = None) \
            -> AwaitableOrValue[Iterable[NodeType]]:
        raise NotImplementedError

    @classmethod
    def resolve_node(cls, node_id: str, *, info: Optional[Info] = None, required: bool = False):
        raise NotImplementedError
