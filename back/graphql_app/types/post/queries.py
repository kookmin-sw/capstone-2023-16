import datetime
from enum import Enum
from typing import Optional, Iterable, cast, List

import strawberry
from django.db.models import QuerySet, Count
from strawberry.types import Info
from strawberry_django_plus import gql, relay
from strawberry_django_plus.relay import GlobalID

from graphql_app import models
from graphql_app.types.decorators import admin_only
from graphql_app.types.enums import SortingDirection, StringFindMode, SequentialConnectionMode
from graphql_app.types.helpers import DatetimeBetween
from graphql_app.types.model_types import Post, Tag
from graphql_app.models import Post as PostModel, Category as CategoryModel, Persona as PersonaModel, Tag as TagModel


@strawberry.enum
class PostSortBy(Enum):
    """
    게시물 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    READ_CNT = strawberry.enum_value('read_count', description='조회수')


@strawberry.input
class AuthorFilter:
    """
    작성자 검색 인터페이스
    """
    id: Optional[GlobalID] = strawberry.field(description='작성자 페르소나의 ID')

    def apply(self, qs: QuerySet):
        if self.id:
            author = PersonaModel.objects.get(id=self.id.node_id)
            return qs.filter(author=author)
        else:
            return qs


@strawberry.input
class TitleFilter:
    """
    제목 검색 인터페이스
    """
    # TODO : title + content 동시에 필터 필요
    mode: Optional[StringFindMode] = strawberry.field(default=StringFindMode.EXACTLY, description='검색 모드')
    token: str = strawberry.field(description='검색 문자열')

    def apply(self, qs: QuerySet):
        if self.mode == StringFindMode.EXACTLY:
            return qs.filter(title=self.token)
        elif self.mode == StringFindMode.CONTAINS:
            return qs.filter(title__contains=self.token)
        elif self.mode == StringFindMode.STARTS_WITH:
            return qs.filter(title__startswith=self.token)
        elif self.mode == StringFindMode.ENDS_WITH:
            return qs.filter(title__endswith=self.token)


@strawberry.input
class ContentFilter:
    # TODO : Public-Private content field로 분리되면 필드 추가 필요
    pass


@strawberry.input
class CategoryFilter:
    """
    카테고리 검색 인터페이스
    """
    id: Optional[GlobalID] = strawberry.field(description='검색할 카테고리의 ID')

    def apply(self, qs: QuerySet):
        if self.id:
            category = CategoryModel.objects.get(id=self.id.node_id)
            return qs.filter(category=category)
        else:
            return qs


@strawberry.input
class TagFilter:
    """
    태그 검색 인터페이스 (or 적용)
    """
    tag_ids: List[GlobalID] = strawberry.field(description='태그 ID 목록')

    def apply(self, qs: QuerySet):
        tags = TagModel.objects.filter(id__in=map(lambda t: t.node_id, self.tag_ids))
        return qs.filter(tags__in=tags)


@gql.type
class Query:
    post: Post = relay.node()

    @strawberry.input
    class PostSortingOption:
        """
        게시물 목록 조회시 적용할 정렬 방법
        """
        sort_by: Optional[PostSortBy] = strawberry.field(default=PostSortBy.CREATED_AT, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.DESC, description='정렬 방향')

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
        posts = PostModel.objects.filter(is_public=True, is_deleted=False)
        for field_filter in (created_at_filter, author_filter, title_filter, category_filter, tags_filter):
            if field_filter is not None:
                posts = field_filter.apply(posts)

        if sorting_opt.sort_by in (PostSortBy.ID, PostSortBy.CREATED_AT, PostSortBy.READ_CNT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            posts = posts.order_by(order_by_prefix + order_by_suffix, 'id')

        return cast(Iterable[Post], posts)

    @gql.field
    def get_post(self, info: Info, post_id: GlobalID, persona_id: GlobalID) -> Post:
        fetched_post = PostModel.objects.get(id=info.variable_values['postId'].node_id)

        return cast(Post, fetched_post)

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
        posts = PostModel.objects.all()
        for field_filter in (created_at_filter, author_filter, title_filter, category_filter, tags_filter):
            if field_filter is not None:
                posts = field_filter.apply(posts)

        if sorting_opt.sort_by in (PostSortBy.ID, PostSortBy.CREATED_AT, PostSortBy.READ_CNT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            posts = posts.order_by(order_by_prefix + order_by_suffix, 'id')

        return cast(Iterable[Post], posts)
