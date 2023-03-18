from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from django.db.models import Count, Sum, QuerySet
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.resolvers.decorators import requires_auth
from graphql_app.resolvers.enums import SortingDirection, StringFindMode, Gender
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Persona
from graphql_app.models import Persona as PersonaModel
from graphql_app.resolvers.persona import Job


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
class PersonaSortingOption:
    """
    페르소나 목록 조회 시 적용할 정렬 방법
    """
    sort_by: Optional[PersonaSortBy] = strawberry.field(default=PersonaSortBy.CREATED_AT, description='정렬 기준')
    direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.DESC, description='정렬 방향')


@strawberry.input
class AgeFilter:
    """
    일정 나이 구간의 데이터를 받아 오기 위한 인터페이스
    """
    min_age: Optional[int] = strawberry.field(default=0, description='최소 나이')
    max_age: Optional[int] = strawberry.field(default=100, description='최대 나이')

    def apply(self, qs: QuerySet):
        if self.min_age:
            qs = qs.filter(age__isnull=False, age__gte=self.min_age)
        if self.max_age:
            qs = qs.filter(age__isnull=False, age__lte=self.max_age)

        return qs


@strawberry.input
class NicknameFilter:
    """
    닉네임 검색 인터페이스
    """

    mode: Optional[StringFindMode] = strawberry.field(default=StringFindMode.EXACTLY, description='검색 모드')
    token: str = strawberry.field(description='검색 문자열')

    def apply(self, qs: QuerySet):
        if self.mode == StringFindMode.EXACTLY:
            return qs.filter(nickname=self.token)
        elif self.mode == StringFindMode.CONTAINS:
            return qs.filter(nickname__contains=self.token)
        elif self.mode == StringFindMode.STARTS_WITH:
            return qs.filter(nickname__startswith=self.token)
        elif self.mode == StringFindMode.ENDS_WITH:
            return qs.filter(nickname__endswith=self.token)


@strawberry.input
class GenderFilter:
    """
    성별 검색 인터페이스
    """
    gender: Gender = strawberry.field(description='검색할 성별')

    def apply(self, qs: QuerySet):
        return qs.filter(gender=self.gender)


@strawberry.input
class IsCertifiedFilter:
    """
    공인 여부 검색 인터페이스
    """
    is_certified: bool = strawberry.field(description='공인 여부')

    def apply(self, qs: QuerySet):
        return qs.filter(is_certified=self.is_certified)


@strawberry.input
class JobFilter:
    """
    직업 검색 인터페이스
    """
    job: Job = strawberry.field(description='검색할 직업')

    def apply(self, qs: QuerySet):
        return qs.filter(job=self.job)


@gql.type
class Query:
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
                            sorting_opt: PersonaSortingOption,
                            created_at_filter: Optional[DatetimeBetween] = None,
                            age_filter: Optional[AgeFilter] = None,
                            nickname_filter: Optional[NicknameFilter] = None,
                            gender_filter: Optional[GenderFilter] = None,
                            is_certified_filter: Optional[IsCertifiedFilter] = None,
                            job_filter: Optional[JobFilter] = None) -> Iterable[Persona]:
        """
        모든 공개 페르소나의 목록
        """
        personas = PersonaModel.objects.filter(is_public=True)
        for field_filter in (created_at_filter, age_filter, nickname_filter,
                             gender_filter, is_certified_filter, job_filter):
            if field_filter is not None:
                personas = field_filter.apply(personas)

        if sorting_opt.sort_by in (PersonaSortBy.ID, PersonaSortBy.NICKNAME, PersonaSortBy.CREATED_AT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            personas = personas.order_by(order_by_prefix + order_by_suffix, 'id')
        else:
            # 게시물 조회수 총합이 많은 순
            if sorting_opt.sort_by == PersonaSortBy.TOTAL_POST_READ_CNT:
                personas = personas.annotate(
                    total_post_read_cnt=Sum('written_posts__read_count')
                ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}total_post_read_cnt", 'id')
            elif sorting_opt.sort_by == PersonaSortBy.FOLLOWER_CNT:
                personas = personas.annotate(
                    follower_cnt=Count('follower_personas')
                ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}follower_cnt", 'id')

        return cast(Iterable[Persona], personas)
