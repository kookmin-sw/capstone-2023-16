from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from django.db.models import Count, Q, QuerySet
from strawberry.types import Info
from strawberry_django_plus import gql, relay

from graphql_app.resolvers.enums import SortingDirection, StringFindMode
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Tag
from graphql_app.models import Tag as TagModel


@strawberry.enum
class TagSortBy(Enum):
    """
    태그 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    LEXICOGRAPHICAL = strawberry.enum_value('body', description='사전순')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    PERSONA_PREFERENCE_CNT = strawberry.enum_value('persona_preference_cnt', description='선호 페르소나 수 기준')
    POST_CONNECTION_CNT = strawberry.enum_value('post_connection_cnt', description='연결된 게시물 수 기준')


@strawberry.input
class TagBodyFilter:
    """
    태그 검색 인터페이스
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
    tag: Optional[Tag] = relay.node()

    @strawberry.input
    class TagSortingOption:
        """
        태그 목록 조회 시 적용할 정렬 방법
        """
        sort_by: Optional[TagSortBy] = strawberry.field(default=TagSortBy.ID, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')

    @gql.django.connection
    def get_all_tags(self, info: Info,
                     sorting_opt: TagSortingOption,
                     created_at_filter: Optional[DatetimeBetween] = None,
                     body_filter: Optional[TagBodyFilter] = None) -> Iterable[Tag]:
        """
        등록된 모든 태그의 목록
        """
        tags = TagModel.objects.all()

        for field_filter in (created_at_filter, body_filter):
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

        return cast(Iterable[Tag], tags)
