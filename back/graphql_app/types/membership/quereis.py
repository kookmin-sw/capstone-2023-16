from enum import Enum
from typing import Optional, Iterable, cast

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

from graphql_app.types.decorators import requires_auth
from graphql_app.types.enums import SortingDirection
from graphql_app.types.membership.enums import GetMembershipAs
from graphql_app.types.model_types import Membership
from graphql_app.models import Membership as MembershipModel, Persona as PersonaModel


@strawberry.enum
class MembershipSortBy(Enum):
    """
    멤버쉽 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    SUBSCRIBER_NICKNAME = strawberry.enum_value('subscriber__nickname', description='구독자 닉네임')
    CREATOR_NICKNAME = strawberry.enum_value('creator_nickname', description='창작자 닉네임')
    TIER = strawberry.enum_value('tier', description='티어')


@gql.type
class Query:
    @strawberry.input
    class MembershipSortingOption:
        """
        멤버쉽 목록 조회시 적용할 정렬 방법
        """
        sort_by: Optional[MembershipSortBy] = strawberry.field(default=MembershipSortBy.ID, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')

    @gql.django.connection
    @requires_auth
    def get_own_memberships(self, info: Info, mode: GetMembershipAs, requested_persona_id: GlobalID,
                            sorting_opt: MembershipSortingOption) -> Iterable[Membership]:
        """
        요청한 페르소나의 멤버쉽 목록
        """
        requested_persona = PersonaModel.objects.get(id=requested_persona_id.node_id)

        if mode == GetMembershipAs.SUBSCRIBER:
            memberships = MembershipModel.objects.filter(subscriber=requested_persona)
        else:
            memberships = MembershipModel.objects.filter(creator=requested_persona)

        if sorting_opt.sort_by in (MembershipSortBy.ID, MembershipSortBy.CREATED_AT, MembershipSortBy.TIER,
                                   MembershipSortBy.SUBSCRIBER_NICKNAME, MembershipSortBy.CREATOR_NICKNAME):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            memberships = memberships.order_by(order_by_prefix + order_by_suffix, 'id')

        return cast(Iterable[Membership], memberships)