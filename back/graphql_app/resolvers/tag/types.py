from typing import Optional

import strawberry
from django.db.models import QuerySet

from graphql_app.resolvers.enums import StringFindMode, SortingDirection
from graphql_app.resolvers.interfaces import StringRetrieveFilter
from graphql_app.resolvers.model_types import Tag
from graphql_app.resolvers.tag.enums import TagSortBy


@strawberry.type
class TagInsertionResult:
    """
    Tag insertion 결과
    """
    tag: Tag = strawberry.field(description='Upsert된 태그')
    is_created: bool = strawberry.field(description='새로 생성된 경우 true, 아닌 경우 false')

    def __init__(self, tag: Tag, is_created: bool):
        self.tag = tag
        self.is_created = is_created


@strawberry.input
class TagSortingOption:
    """
    태그 목록 조회 시 적용할 정렬 방법
    """
    sort_by: Optional[TagSortBy] = strawberry.field(default=TagSortBy.ID, description='정렬 기준')
    direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')


@strawberry.input
class TagBodyFilter(StringRetrieveFilter):
    """
    태그 검색 인터페이스
    """

    mode: Optional[StringFindMode] = strawberry.field(default=StringFindMode.EXACTLY, description='검색 모드')
    token: str = strawberry.field(description='검색 문자열')

    def apply(self, qs: QuerySet) -> QuerySet:
        suffix = super().mode_suffix[self.mode]
        _filter = {'body' + suffix: self.token}
        return qs.filter(**_filter)
