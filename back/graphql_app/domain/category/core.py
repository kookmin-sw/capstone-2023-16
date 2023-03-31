from typing import Optional, Tuple

from django.db import IntegrityError
from django.db.models import QuerySet, Count, Q

from graphql_app.domain.category.exceptions import DuplicatedCategoryBodyException
from graphql_app.models import Category
from graphql_app.resolvers.category.enums import CategorySortBy
from graphql_app.resolvers.category.types import CategorySortingOption
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.RetreiveFilter import RetreiveFilter


# 저장된 모든 카테고리의 목록을 반환하는 함수
def get_all_categories(sorting_opt: CategorySortingOption,
                       filters: Tuple[Optional[RetreiveFilter]]) -> QuerySet[Category]:
    categories = Category.objects.all()

    # 필터 적용
    for field_filter in filters:
        if field_filter is not None:
            categories = field_filter.apply(categories)

    # 정적 정렬 조건
    if sorting_opt.sort_by in (CategorySortBy.ID, CategorySortBy.LEXICOGRAPHICAL, CategorySortBy.CREATED_AT):
        order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_opt.sort_by.value
        categories = categories.order_by(order_by_prefix + order_by_suffix, 'id')
    # DB 조회가 필요한 정렬 조건
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

    return categories


def create_category(body: str) -> Category:
    """
    새 카테고리를 생성하는 함수 (중복 허용 X)
    단, 카테고리 생성에 실패한 경우 아무 것도 반환하지 않는다.
    :param body: 생성할 카테고리의 body 값
    :return: 생성된 새 카테고리
    :raises DuplicatedCategoryBodyException: 이미 존재하는 body로 카테고리 생성을 시도한 경우
    """
    try:
        new_category = Category.objects.create(body=body)
    except IntegrityError:
        raise DuplicatedCategoryBodyException
    else:
        return new_category
