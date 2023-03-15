from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from django.db.models import Count
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.models import Category as CategoryModel, Persona as PersonaModel
from graphql_app.types.enums import SortingDirection
from graphql_app.types.model_types import Category


@strawberry.enum
class CategorySortBy(Enum):
    """
    카테고리 정렬 기준
    """
    ID = 'id'
    LEXICOGRAPHICAL = 'body'
    CREATED_AT = 'created_at'
    PERSONA_REFERENCE_CNT = '선호 페르소나 수 기준'
    POST_CONNECTION_CNT = '연결된 게시물 수 기준'


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
    def get_all_categories(self, info: Info, sorting_opt: CategorySortingOption) -> Iterable[Category]:
        """
        시스템에 등록된 모든 카테고리의 목록
        """
        if sorting_opt.sort_by in (CategorySortBy.ID, CategorySortBy.LEXICOGRAPHICAL, CategorySortBy.CREATED_AT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            categories = CategoryModel.objects.all().order_by(order_by_prefix + order_by_suffix, 'id')
        else:
            # 해당 카테고리를 선호하는 페르소나 수 기준 (공개 페르소나만)
            if sorting_opt.sort_by == CategorySortBy.PERSONA_REFERENCE_CNT:
                categories = CategoryModel.objects.raw(f"""
                SELECT categories.id, body
                FROM categories
                    LEFT JOIN personas_preferred_categories ppc on categories.id = ppc.category_id
                        LEFT JOIN personas p on ppc.persona_id = p.id
                WHERE p.is_public=true OR ISNULL(p.is_public)
                GROUP BY categories.id, body
                ORDER BY COUNT(*) {sorting_opt.direction.name}, categories.id ASC;""")
            # 연결된 게시물 수 기준 (공개 페르소나 및 공개 포스트만)
            elif sorting_opt.sort_by == CategorySortBy.POST_CONNECTION_CNT:
                categories = CategoryModel.objects.raw(f"""
                SELECT categories.id, body
                FROM categories
                    LEFT JOIN graphql_app_post post on categories.id = post.category_id
                        LEFT JOIN personas p on post.author_persona_id=p.id
                WHERE (p.is_public=true OR ISNULL(p.is_public)) AND (post.is_public OR ISNULL(p.is_public))
                GROUP BY categories.id, body
                ORDER BY COUNT(*) {sorting_opt.direction.name}, categories.id ASC;""")

        return cast(Iterable[Category], categories)
