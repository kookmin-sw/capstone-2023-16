from typing import Optional, Iterable, cast

from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from graphql_app.types.model_types import PostNode
from graphql_app.models import Post as PostModel


@gql.type
class Query:
    post: Optional[PostNode] = relay.node()

    @gql.django.connection
    def posts_connection(self) -> Iterable[PostNode]:
        return cast(Iterable[PostNode], PostModel.objects.all())
