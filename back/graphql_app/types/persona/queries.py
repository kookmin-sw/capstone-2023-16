from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from django.db.models import Count, Sum
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.types.decorators import requires_auth
from graphql_app.types.enums import SortingDirection
from graphql_app.types.model_types import Persona
from graphql_app.models import Persona as PersonaModel


@strawberry.enum
class PersonaSortBy(Enum):
    """
    페르소나 정렬 기준
    """
    ID = 'id'
    NICKNAME = 'nickname'
    CREATED_AT = 'created_at'
    TOTAL_POST_READ_CNT = '게시물 총 조회수'
    FOLLOWER_CNT = '팔로워 수'


@gql.type
class Query:
    @strawberry.input
    class PersonaSortingOption:
        """
        페르소나 목록 조회 시 적용할 정렬 방법
        """
        sort_by: Optional[PersonaSortBy] = strawberry.field(default=PersonaSortBy.ID, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')

    @gql.django.connection
    @requires_auth
    def get_own_personas(self, info: Info) -> Iterable[Persona]:
        """
        로그인한 사용자의 페르소나 목록
        """
        requested_user = info.context.request.user
        return cast(Iterable[Persona], PersonaModel.objects.filter(owner=requested_user))

    @gql.django.connection
    def get_public_personas(self, info: Info, sorting_opt: PersonaSortingOption) -> Iterable[Persona]:
        """
        모든 공개 페르소나의 목록
        """
        if sorting_opt.sort_by in (PersonaSortBy.ID, PersonaSortBy.NICKNAME, PersonaSortBy.CREATED_AT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            personas = PersonaModel.objects.all().order_by(order_by_prefix + order_by_suffix, 'id')
        else:
            # 게시물 조회수 총합이 많은 순
            if sorting_opt.sort_by == PersonaSortBy.TOTAL_POST_READ_CNT:
                personas = PersonaModel.objects.filter(is_public=True).annotate(
                    total_post_read_cnt=Sum('written_posts__read_count')
                ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}total_post_read_cnt", 'id')
            elif sorting_opt.sort_by == PersonaSortBy.FOLLOWER_CNT:
                personas = PersonaModel.objects.filter(is_public=True).annotate(
                    follower_cnt=Count('follower_personas')
                ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}follower_cnt", 'id')

        return cast(Iterable[Persona], personas)
