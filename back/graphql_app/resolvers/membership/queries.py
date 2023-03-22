from typing import Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.domain.membership.core import get_own_memberships
from graphql_app.resolvers.decorators import requires_persona_context
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.membership.enums import GetMembershipAs
from graphql_app.resolvers.membership.types import MembershipSortingOption
from graphql_app.resolvers.model_types import Membership, Persona


@gql.type
class Query:
    @gql.django.connection
    @requires_persona_context
    def get_own_memberships(self, info: Info, mode: GetMembershipAs,
                            sorting_opt: MembershipSortingOption) -> Iterable[Membership]:
        """
        요청한 페르소나의 멤버쉽 목록
        """
        requested_persona: Persona = info.context.request.persona
        memberships = get_own_memberships(requested_persona, mode.value, sorting_opt)
        return cast(Iterable[Membership], memberships)
