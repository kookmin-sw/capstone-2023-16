from typing import Optional, Iterable

import strawberry

from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from auth_app.models import Post as PostModel
from typing_extensions import Self

from strawberry_django_plus.mutations import resolvers


@strawberry.type
class PostCreateSuccess:
    post: str


@strawberry.type
class PostCreateError:
    message: str


PostCreateResult = strawberry.union("PostCreateResult", (PostCreateSuccess, PostCreateError))


@gql.type
class Post(relay.Node):
    _id: strawberry.Private[int]
    title: str
    content: str

    @classmethod
    def resolve_id(cls, root: Self, *, info: Optional[Info] = None):
        return root._id

    @classmethod
    def resolve_node(cls, node_id: str, info: Optional[Info] = None, required=False):
        return PostModel.objects.get(pk=node_id)

    @classmethod
    def resolve_nodes(cls, info: Optional[Info] = None, node_ids: Optional[Iterable[str]] = None):
        if node_ids is not None:
            posts = PostModel.objects.filter(id__in=node_ids).values  # FIXME: node_id 를 base64 decode 해야함
        else:
            posts = PostModel.objects.all().values()

        # TODO: Author도 fk resolve 되어야 함
        return map(lambda post: Post(title=post['title'], content=post['content'], _id=post['id']), posts)


@gql.type
class Query:
    post: Optional[Post] = relay.node()
    posts_connection: relay.Connection[Post] = relay.connection()


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
    def post_create(self, info: Info, input: CreatePostInput) -> Post:
        return resolvers.create(info, PostModel, resolvers.parse_input(info, vars(input)))
