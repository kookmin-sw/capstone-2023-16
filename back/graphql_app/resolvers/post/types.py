from typing import Optional, List

import strawberry
from django.db.models import QuerySet
from strawberry_django_plus.relay import GlobalID

from graphql_app.models import Persona, Category, Tag
from graphql_app.resolvers.enums import StringFindMode, SortingDirection
from graphql_app.resolvers.interfaces import StringRetrieveFilter, RetreiveFilter
from graphql_app.resolvers.post.enums import PostSortBy


@strawberry.input
class AuthorFilter(RetreiveFilter):
    """
    작성자 검색 인터페이스
    """
    id: GlobalID = strawberry.field(description='작성자 페르소나의 ID')

    def apply(self, qs: QuerySet):
        author = Persona.objects.get(id=self.id.node_id)
        return qs.filter(author=author)


@strawberry.input
class ContentFilter(RetreiveFilter):
    # TODO : Public-Private content field로 분리되면 필드 추가 필요
    pass


@strawberry.input
class TitleFilter(StringRetrieveFilter):
    """
    제목 검색 인터페이스
    """
    # TODO : title + content 동시에 필터 필요
    mode: Optional[StringFindMode] = strawberry.field(default=StringFindMode.EXACTLY, description='검색 모드')
    token: str = strawberry.field(description='검색 문자열')

    def apply(self, qs: QuerySet):
        suffix = super().mode_suffix[self.mode]
        _filter = {'title' + suffix: self.token}
        return qs.filter(**_filter)


@strawberry.input
class CategoryFilter(RetreiveFilter):
    """
    카테고리 검색 인터페이스
    """
    id: GlobalID = strawberry.field(description='검색할 카테고리의 ID')

    def apply(self, qs: QuerySet):
        category = Category.objects.get(id=self.id.node_id)
        return qs.filter(category=category)


@strawberry.input
class TagFilter(RetreiveFilter):
    """
    태그 검색 인터페이스 (or 적용)
    """
    tag_ids: List[GlobalID] = strawberry.field(description='태그 ID 목록')

    def apply(self, qs: QuerySet):
        tags = Tag.objects.filter(id__in=map(lambda t: t.node_id, self.tag_ids))
        return qs.filter(tags__in=tags)


@strawberry.input
class IsPublicFilter(RetreiveFilter):
    """
    공개 여부 검색 인터페이스
    """
    is_public: Optional[bool] = strawberry.field(default=True, description='공개 여부')

    def __init__(self, is_public: bool, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_public = is_public

    def apply(self, qs: QuerySet) -> QuerySet:
        return qs.filter(is_public=self.is_public)


@strawberry.input
class IsDeletedFilter(RetreiveFilter):
    """
    삭제 여부 검색 인터페이스
    """
    is_deleted: Optional[bool] = strawberry.field(default=False, description='삭제 여부')

    def __init__(self, is_deleted: bool, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_deleted = is_deleted

    def apply(self, qs: QuerySet) -> QuerySet:
        return qs.filter(is_deleted=self.is_deleted)


@strawberry.input
class PostSortingOption:
    """
    게시물 목록 조회시 적용할 정렬 방법
    """
    sort_by: Optional[PostSortBy] = strawberry.field(default=PostSortBy.CREATED_AT, description='정렬 기준')
    direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.DESC, description='정렬 방향')
