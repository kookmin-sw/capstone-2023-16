from typing import Optional, List

import strawberry
from django.db.models import QuerySet
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

from graphql_app import models
from graphql_app.resolvers.enums import StringFindMode, SortingDirection
from graphql_app.resolvers.RetreiveFilter import RetreiveFilter, StringRetrieveFilter
from graphql_app.resolvers.model_types import User
from graphql_app.resolvers.persona.enums import Gender
from graphql_app.resolvers.persona.enums import PersonaSortBy, Job


@gql.django.input(models.Category)
class CategoryIDInput:
    id: gql.auto = strawberry.field(description='카테고리 ID')


@gql.django.input(models.Persona)
class PersonaCreateInput:
    """
    페르소나 생성에 필요한 정보
    """
    nickname: str = strawberry.field(description='닉네임 (unique)')
    introduction: Optional[str] = strawberry.field(default='자기소개가 없습니다.', description='소개')
    is_public: Optional[bool] = strawberry.field(default=True, description='공개 여부')
    gender: Optional[Gender] = strawberry.field(default=None, description='성별')
    age: Optional[int] = strawberry.field(default=None, description='나이')
    job: Optional[Job] = strawberry.field(default=None, description='직업')
    preferred_tag_bodies: Optional[List[str]] = strawberry.field(default_factory=list,
                                                                 description='선호하는 태그의 body 목록 (insert 됨)')
    preferred_categories: Optional[List[CategoryIDInput]] = strawberry.field(default_factory=list,
                                                                             description='선호 카테고리 목록')


@strawberry.input
class PersonaSortingOption:
    """
    페르소나 목록 조회 시 적용할 정렬 방법
    """
    sort_by: Optional[PersonaSortBy] = strawberry.field(default=PersonaSortBy.CREATED_AT, description='정렬 기준')
    direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.DESC, description='정렬 방향')


@strawberry.input
class AgeFilter(RetreiveFilter):
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
class NicknameFilter(StringRetrieveFilter):
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
class GenderFilter(RetreiveFilter):
    """
    성별 검색 인터페이스
    """
    gender: Gender = strawberry.field(description='검색할 성별')

    def apply(self, qs: QuerySet):
        return qs.filter(gender=self.gender)


@strawberry.input
class IsCertifiedFilter(RetreiveFilter):
    """
    공인 여부 검색 인터페이스
    """
    is_certified: bool = strawberry.field(description='공인 여부')

    def apply(self, qs: QuerySet):
        return qs.filter(is_certified=self.is_certified)


@strawberry.input
class JobFilter(RetreiveFilter):
    """
    직업 검색 인터페이스
    """
    job: Job = strawberry.field(description='검색할 직업')

    def apply(self, qs: QuerySet):
        return qs.filter(job=self.job)


@strawberry.input
class IsPublicFilter(RetreiveFilter):
    """
    공개 여부 기준 검색 인터페이스
    """
    is_public: bool = strawberry.field(description='공개 여부')

    def __init__(self, is_public: bool, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_public = is_public

    def apply(self, qs: QuerySet):
        return qs.filter(job=self.is_public)


@strawberry.input
class OwnerFilter(RetreiveFilter):
    """
    소유자 기준 검색 인터페이스
    """
    owner: User = strawberry.field(description='소유자')

    def __init__(self, owner: User, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.owner = owner

    def apply(self, qs: QuerySet) -> QuerySet:
        return qs.filter(owner=self.owner)


@gql.django.input(models.Persona)
class PersonaFollowToggleInput:
    """
    페르소나 팔로우/언팔로우 토글에 필요한 정보
    """
    followee_persona: GlobalID = strawberry.field(description='팔로우/언팔로우의 대상이 되는 페르소나의 ID')


@strawberry.type
class PersonaFollowToggleOutput:
    """
    페르소나 팔로우/언팔로우 토글 결과
    """
    followee_persona: GlobalID = strawberry.field(description='팔로우/언팔로우 토글을 수행한 페르소나의 ID')
    followed: bool = strawberry.field(description='작업 수행 후 팔로우 여부')
