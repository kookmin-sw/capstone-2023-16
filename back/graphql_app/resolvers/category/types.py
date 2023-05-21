from typing import Optional

import strawberry
from django.db.models import QuerySet

from graphql_app.resolvers.category.enums import CategorySortBy
from graphql_app.resolvers.enums import StringFindMode, SortingDirection
from graphql_app.resolvers.RetreiveFilter import RetreiveFilter


@strawberry.input
class CategoryBodyFilter(RetreiveFilter):
    """
    카테고리 검색 인터페이스
    """
    mode: Optional[StringFindMode] = strawberry.field(default=StringFindMode.EXACTLY, description='검색 모드')
    token: str = strawberry.field(description='검색 문자열')

    def apply(self, qs: QuerySet) -> QuerySet:
        if self.mode == StringFindMode.EXACTLY:
            return qs.filter(body=self.token)
        elif self.mode == StringFindMode.CONTAINS:
            return qs.filter(body__contains=self.token)
        elif self.mode == StringFindMode.STARTS_WITH:
            return qs.filter(body__startswith=self.token)
        elif self.mode == StringFindMode.ENDS_WITH:
            return qs.filter(body__endswith=self.token)


@strawberry.input
class CategorySortingOption:
    """
    카테고리 목록 조회 시 적용할 정렬 방법
    """
    sort_by: Optional[CategorySortBy] = strawberry.field(default=CategorySortBy.ID, description='정렬 기준')
    direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')
