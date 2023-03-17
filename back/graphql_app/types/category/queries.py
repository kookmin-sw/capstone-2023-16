from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from django.db.models import Count, Q, QuerySet
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.models import Category as CategoryModel
from graphql_app.types.enums import SortingDirection, StringFindMode
from graphql_app.types.helpers import DatetimeBetween
from graphql_app.types.model_types import Category


@strawberry.enum
class CategorySortBy(Enum):
    """
    카테고리 정렬 기준
    """
    ID = strawberry.enum_value('id', description='')
    LEXICOGRAPHICAL = strawberry.enum_value('body', description='')
    CREATED_AT = strawberry.enum_value('created_at', description='')
    PERSONA_REFERENCE_CNT = strawberry.enum_value('persona_preference_cnt', description='선호 페르소나 수 기준')
    POST_CONNECTION_CNT = strawberry.enum_value('post_connection_cnt', description='연결된 게시물 수 기준')


@strawberry.input
class CategoryBodyFilter:
    """
    카테고리 검색 인터페이스
    """
    mode: Optional[StringFindMode] = strawberry.field(default=StringFindMode.EXACTLY, description='검색 모드')
    token: str = strawberry.field(description='검색 문자열')

    def apply(self, qs: QuerySet):
        if self.mode == StringFindMode.EXACTLY:
            return qs.filter(body=self.token)
        elif self.mode == StringFindMode.CONTAINS:
            return qs.filter(body__contains=self.token)
        elif self.mode == StringFindMode.STARTS_WITH:
            return qs.filter(body__startswith=self.token)
        elif self.mode == StringFindMode.ENDS_WITH:
            return qs.filter(body__endswith=self.token)


@gql.type
class Query:
    @strawberry.input
    class CategorySortingOption:
        """
        카테고리 목록 조회 시 적용할 정렬 방법
        """
        sort_by: Optional[CategorySortBy] = strawberry.field(default=CategorySortBy.ID, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')

    @gql.django.connection
    def get_all_categories(self, info: Info,
                           sorting_opt: CategorySortingOption,
                           created_at_filter: Optional[DatetimeBetween] = None,
                           body_filter: Optional[CategoryBodyFilter] = None
                           ) -> Iterable[Category]:
        """
        시스템에 등록된 모든 카테고리의 목록
        """
        categories = CategoryModel.objects.all()

        for field_filter in (created_at_filter, body_filter):
            if field_filter is not None:
                categories = field_filter.apply(categories)

        if sorting_opt.sort_by in (CategorySortBy.ID, CategorySortBy.LEXICOGRAPHICAL, CategorySortBy.CREATED_AT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            categories = categories.order_by(order_by_prefix + order_by_suffix, 'id')
        else:
            # 해당 카테고리를 선호하는 페르소나 수 기준 (공개 페르소나만)
            if sorting_opt.sort_by == CategorySortBy.PERSONA_REFERENCE_CNT:
                categories = categories.annotate(
                    prefer_persona_cnt=Count('preferred_users_as_category',
                                             filter=Q(preferred_users_as_category__is_public=True))
                ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}prefer_persona_cnt", 'id')

            # 연결된 게시물 수 기준 (공개 페르소나 및 공개 포스트만)
            elif sorting_opt.sort_by == CategorySortBy.POST_CONNECTION_CNT:
                categories = categories.annotate(
                    connected_post_cnt=Count('including_posts', filter=Q(including_posts__is_public=True,
                                                                         including_posts__author__is_public=True))
                ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}connected_post_cnt", 'id')

        return cast(Iterable[Category], categories)
