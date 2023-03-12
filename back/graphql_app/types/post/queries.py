from typing import Optional, Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from graphql_app.types.decorators import admin_only
from graphql_app.types.model_types import Post
from graphql_app.models import Post as PostModel


@gql.type
class Query:
    post: Optional[Post] = relay.node()

    @gql.django.connection
    def get_public_posts(self, info: Info) -> Iterable[Post]:
        """
        공개된 모든 게시물의 목록
        """
        return cast(Iterable[Post], PostModel.objects.filter(is_public=True))

    @gql.django.connection
    @admin_only
    def get_entire_posts(self, info: Info) -> Iterable[Post]:
        """
        시스템에 등록된 모든 게시물의 목록
        """
        return cast(Iterable[Post], PostModel.objects.all())
