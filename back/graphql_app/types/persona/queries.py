from enum import Enum
from typing import Iterable, cast, Optional, List

import strawberry
from django.db.models import Count, Sum, QuerySet
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
    ID = strawberry.enum_value('id', description='ID')
    NICKNAME = strawberry.enum_value('nickname', description='닉네임')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    TOTAL_POST_READ_CNT = strawberry.enum_value('total_post_read_cnt', description='게시물 총 조회수')
    FOLLOWER_CNT = strawberry.enum_value('follower_cnt', description='팔로워 수')


@strawberry.input
class AgeBetween:
    """
    일정 나이 구간의 데이터를 받아 오기 위한 인터페이스
    """
    min_age: Optional[int] = strawberry.field(default=0, description='최소 나이')
    max_age: int = strawberry.field(description='최대 나이')

    @staticmethod
    def apply(qs: QuerySet):
        # TODO : query set을 받아서 min_age, max_age 필터링
        pass


@strawberry.enum
class PersonaCondition(Enum):
    """
    페르소나 필터링
    """
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시 (구간)')
    NICKNAME = strawberry.enum_value('nickname', description='닉네임 (정확도 지정 가능)')
    GENDER = strawberry.enum_value('gender', description='성별')
    AGE = strawberry.enum_value('age', description='연령 (구간)')
    JOB = strawberry.enum_value('job', description='직업 (정확도 지정 가능)')
    IS_CERTIFIED = strawberry.enum_value('is_certified', description='공인 여부')


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
    def get_public_personas(self, info: Info,
                            sorting_opt: PersonaSortingOption, conditions: List[PersonaCondition],
                            age_between: Optional[AgeBetween]) -> Iterable[Persona]:
        """
        모든 공개 페르소나의 목록
        """
        personas = PersonaModel.objects.all()
        for condition in conditions:
            condition

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
