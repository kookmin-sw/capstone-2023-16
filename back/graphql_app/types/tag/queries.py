from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.types.enums import SortingDirection
from graphql_app.types.model_types import Tag
from graphql_app.models import Tag as TagModel


@strawberry.enum
class TagSortBy(Enum):
    """
    태그 정렬 기준
    TODO : 인기 있는 태그 등, 다양한 기준으로 정렬할 수 있으면 좋겠음
    """
    ID = 'id'
    LEXICOGRAPHICAL = 'body'
    CREATED_AT = 'created_at'


@gql.type
class Query:
    @strawberry.input
    class TagSortingRule:
        """
        태그 목록 조회 시 적용할 정렬 방법
        """
        sort_by: Optional[TagSortBy] = strawberry.field(default=TagSortBy.ID, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')

    @gql.django.connection
    def get_all_tags(self, info: Info, sorting_rule: TagSortingRule) -> Iterable[Tag]:
        """
        등록된 모든 태그의 목록
        """

        order_by_prefix = '' if sorting_rule.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_rule.sort_by.value
        tags = TagModel.objects.all().order_by(order_by_prefix + order_by_suffix)

        return cast(Iterable[Tag], tags)
