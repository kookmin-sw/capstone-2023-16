from typing import Tuple, Optional

from django.db.models import QuerySet, Count

from graphql_app.models import Tag
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.interfaces import RetreiveFilter
from graphql_app.resolvers.tag.enums import TagSortBy
from graphql_app.resolvers.tag.types import TagSortingOption


def insert_tag(body: str) -> Tuple[Tag, bool]:
    """
    전달 받은 body를 가지는 태그가 있는 경우 기존의 태그를 반환하고,
    그렇지 않은 경우 새 태그를 만들어 반환하는 함수

    :param body: 태그의 body 필드 값
    :return: 삽입/조회된 태그 객체와 bool(생성된 경우 true, 그렇지 않은 경우 false)의 tuple 쌍
    """
    tag, is_created = Tag.objects.get_or_create(body=body)
    return tag, is_created


def get_all_tags(sorting_opt: TagSortingOption, filters: Tuple[Optional[RetreiveFilter]]) -> QuerySet[Tag]:
    """
    저장된 모든 태그의 목록을 반환하는 함수
    :param sorting_opt: 정렬 조건
    :param filters: 적용할 필터의 목록
    :return: 조회 결과
    """
    tags = Tag.objects.all()

    for field_filter in filters:
        if field_filter is not None:
            tags = field_filter.apply(tags)

    if sorting_opt.sort_by in (TagSortBy.ID, TagSortBy.LEXICOGRAPHICAL, TagSortBy.CREATED_AT):
        order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_opt.sort_by.value
        tags = tags.order_by(order_by_prefix + order_by_suffix, 'id')
    else:
        # 해당 태그를 선호하는 페르소나 수 기준 (공개 페르소나만)
        if sorting_opt.sort_by == TagSortBy.PERSONA_PREFERENCE_CNT:
            tags = tags.annotate(
                prefer_persona_cnt=Count('preferred_users_as_tag',
                                         filter=Q(preferred_users_as_tag__is_public=True))
            ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}prefer_persona_cnt", 'id')

        # 연결된 게시물 수 기준 (공개 페르소나 및 공개 포스트만)
        elif sorting_opt.sort_by == TagSortBy.POST_CONNECTION_CNT:
            tags = tags.annotate(
                connected_post_cnt=Count('related_posts', filter=Q(related_posts__is_public=True,
                                                                   related_posts__author__is_public=True))
            ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}connected_post_cnt", 'id')

    return tags
