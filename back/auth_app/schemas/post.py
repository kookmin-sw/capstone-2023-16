from typing import Optional, Iterable, cast

from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay
from strawberry_django_plus.mutations import resolvers

from auth_app.models import Post as PostModel


@gql.django.type(PostModel)
class PostNode(relay.Node):
    title: str
    content: str


@gql.type
class Query:
    post: Optional[PostNode] = relay.node()

    @gql.django.connection
    def posts_connection(self) -> Iterable[PostNode]:
        return cast(Iterable[PostNode], PostModel.objects.all())


@gql.django.partial(PostModel)
class CreatePostInput:
    title: gql.auto
    content: gql.auto
    user_id: int
    is_public: gql.auto
    is_deleted: gql.auto


@gql.type
class Mutation:
    @gql.mutation
    def post_create(self, info: Info, input: CreatePostInput) -> PostNode:
        return resolvers.create(info, PostModel, resolvers.parse_input(info, vars(input)))
