from typing import Optional, Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.post.core import get_posts, get_post
from graphql_app.resolvers.decorators import admin_only
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Post
from graphql_app.resolvers.post.types import PostSortingOption, AuthorFilter, TitleFilter, CategoryFilter, TagFilter, \
    IsPublicFilter, IsDeletedFilter


@gql.type
class Query:
    @gql.django.connection
    def get_public_posts(self, info: Info,
                         sorting_opt: PostSortingOption,
                         created_at_filter: Optional[DatetimeBetween] = None,
                         author_filter: Optional[AuthorFilter] = None,
                         title_filter: Optional[TitleFilter] = None,
                         category_filter: Optional[CategoryFilter] = None,
                         tags_filter: Optional[TagFilter] = None
                         ) -> Iterable[Post]:
        """
        공개된 모든 게시물의 목록
        """
        filters = (IsPublicFilter(True), IsDeletedFilter(False),
                   created_at_filter, author_filter, title_filter, category_filter, tags_filter)
        posts = get_posts(sorting_opt, filters)
        return cast(Iterable[Post], posts)

    @gql.field
    def get_post(self, info: Info, post_id: GlobalID) -> Post:
        """
        게시물 한 건 조회
        """
        # TODO : 조회 기록 남겨야 함
        post_id: int = int(post_id.node_id)
        return get_post(post_id)

    @gql.django.connection
    @admin_only
    def get_entire_posts(self, info: Info,
                         sorting_opt: PostSortingOption,
                         created_at_filter: Optional[DatetimeBetween] = None,
                         author_filter: Optional[AuthorFilter] = None,
                         title_filter: Optional[TitleFilter] = None,
                         category_filter: Optional[CategoryFilter] = None,
                         tags_filter: Optional[TagFilter] = None) -> Iterable[Post]:
        """
        시스템에 등록된 모든 게시물의 목록
        """
        filters = (created_at_filter, author_filter, title_filter, category_filter, tags_filter)
        posts = get_posts(sorting_opt, filters)
        return cast(Iterable[Post], posts)
