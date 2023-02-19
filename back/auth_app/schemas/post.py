from typing import Optional, Iterable

import strawberry

from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from auth_app.models import Post as PostModel
from typing_extensions import Self


@strawberry.type
class PostCreateSuccess:
    post: str


@strawberry.type
class PostCreateError:
    message: str


PostCreateResult = strawberry.union("PostCreateResult", (PostCreateSuccess, PostCreateError))


def to_post(post):
    p = Post(title=post['title'], content=post['content'], _id=post['id'])
    return p


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
            posts = PostModel.objects.filter(id__in=node_ids).values
        else:
            posts = PostModel.objects.all().values()

        return map(lambda post: Post(title=post['title'], content=post['content'], _id=post['id']), posts)


@gql.type
class Query:
    post: Optional[Post] = relay.node()
    posts_connection: relay.Connection[Post] = relay.connection()


@strawberry.type
class Mutation:
    @strawberry.mutation
    def post_create(self, info: Info, title: str, content: str) -> PostCreateResult:
        pass
