from typing import Optional, Iterable, cast, Type

from strawberry.types.info import Info
from strawberry.utils.await_maybe import AwaitableOrValue
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay
from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus.relay import NodeType

from auth_app.models import Post as PostModel
from auth_app.schemas.utils import requires_auth


@gql.django.type(PostModel)
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


@gql.type
class Query:
    post: Optional[PostNode] = relay.node()

    @gql.django.connection
    def posts_connection(self) -> Iterable[PostNode]:
        return cast(Iterable[PostNode], PostModel.objects.all())


@gql.django.input(PostModel)
class CreatePostInput:
    title: gql.auto
    content: gql.auto


@gql.type
class Mutation:
    # TODO: Type 수정
    # noinspection PyTypeChecker
    @gql.mutation
    def post_create(self, info: Info, input: CreatePostInput) -> PostNode:
        input.user_id = info.context.request.user.id
        return resolvers.create(info, PostModel, resolvers.parse_input(info, vars(input)))
