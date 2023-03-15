from enum import Enum
from typing import Optional, Iterable, cast

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from graphql_app.types.decorators import admin_only
from graphql_app.types.enums import SortingDirection
from graphql_app.types.model_types import Post
from graphql_app.models import Post as PostModel


@strawberry.enum
class PostSortBy(Enum):
    """
    게시물 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    READ_CNT = strawberry.enum_value('read_count', description='조회수')


@gql.type
class Query:
    @strawberry.input
    class PostSortingOption:
        """
        게시물 목록 조회시 적용할 정렬 방법
        """
        sort_by: Optional[PostSortBy] = strawberry.field(default=PostSortBy.CREATED_AT, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.DESC, description='정렬 방향')

    post: Optional[Post] = relay.node()

    @gql.django.connection
    def get_public_posts(self, info: Info, sorting_opt: PostSortingOption) -> Iterable[Post]:
        """
        공개된 모든 게시물의 목록
        """

        if sorting_opt.sort_by in (PostSortBy.ID, PostSortBy.CREATED_AT, PostSortBy.READ_CNT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            posts = PostModel.objects.filter(is_public=True).order_by(order_by_prefix + order_by_suffix, 'id')

        return cast(Iterable[Post], posts)

    @gql.django.connection
    @admin_only
    def get_entire_posts(self, info: Info, sorting_opt: PostSortingOption) -> Iterable[Post]:
        """
        시스템에 등록된 모든 게시물의 목록
        """
        if sorting_opt.sort_by in (PostSortBy.ID, PostSortBy.CREATED_AT, PostSortBy.READ_CNT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            posts = PostModel.objects.all().order_by(order_by_prefix + order_by_suffix, 'id')

        return cast(Iterable[Post], posts)
