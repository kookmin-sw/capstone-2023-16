from typing import Optional, Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from graphql_app.types.decorators import admin_only, requires_auth
from graphql_app.types.model_types import PostNode
from graphql_app.models import Post as PostModel


@gql.type
class Query:
    post: Optional[PostNode] = relay.node()

    @gql.django.connection
    @requires_auth
    def get_public_post_connection(self, info: Info) -> Iterable[PostNode]:
        """
        공개된 모든 게시물의 목록
        """
        return cast(Iterable[PostNode], PostModel.objects.filter(is_public=True))

    @gql.django.connection
    @admin_only
    def get_entire_post_connection(self, info: Info) -> Iterable[PostNode]:
        """
        시스템에 등록된 모든 게시물의 목록
        """
        return cast(Iterable[PostNode], PostModel.objects.all())
