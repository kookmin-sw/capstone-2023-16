from typing import Iterable, cast, Optional

from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.domain.persona.core import get_personas
from graphql_app.resolvers.decorators import requires_auth
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Persona
from graphql_app.resolvers.persona.types import PersonaSortingOption, AgeFilter, NicknameFilter, GenderFilter, \
    IsCertifiedFilter, JobFilter, IsPublicFilter, OwnerFilter


@gql.type
class Query:
    @gql.django.connection
    @requires_auth
    def get_own_personas(self, info: Info,
                         sorting_opt: PersonaSortingOption,
                         created_at_filter: Optional[DatetimeBetween] = None,
                         age_filter: Optional[AgeFilter] = None,
                         nickname_filter: Optional[NicknameFilter] = None,
                         gender_filter: Optional[GenderFilter] = None,
                         is_certified_filter: Optional[IsCertifiedFilter] = None,
                         job_filter: Optional[JobFilter] = None) -> Iterable[Persona]:
        """
        로그인한 사용자의 페르소나 목록
        """
        requested_user = info.context.request.user
        filters = (OwnerFilter(requested_user), created_at_filter, age_filter,
                   nickname_filter, gender_filter, is_certified_filter, job_filter)
        personas = get_personas(sorting_opt, filters)
        return cast(Iterable[Persona], personas)

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
        filters = (IsPublicFilter(is_public=True), created_at_filter, age_filter, nickname_filter,
                   gender_filter, is_certified_filter, job_filter)
        personas = get_personas(sorting_opt, filters)
        return cast(Iterable[Persona], personas)
