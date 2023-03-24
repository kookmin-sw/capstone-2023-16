import strawberry
from strawberry.schema.types.base_scalars import Void
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import auto
from strawberry_django_plus.mutations import resolvers

from graphql_app import models
from graphql_app.domain.membership.core import create_membership, remove_membership
from graphql_app.domain.membership.enums import Tier
from graphql_app.domain.membership.exceptions import AlreadyJoinedException, MembershipNotFoundException
from graphql_app.resolvers.decorators import requires_persona_context
from graphql_app.resolvers.errors import AuthInfoRequiredError, CookieContextRequiredError
from graphql_app.resolvers.membership.errors import AlreadyJoinedMembershipError, NotMemberError
from graphql_app.resolvers.model_types import Membership, Persona


@gql.type
class Mutation:
    @gql.django.input(models.Membership)
    class JoinMembershipInput:
        """
        멤버쉽 가입 input
        """
        creator: auto = strawberry.field(description='구독 대상 페르소나')
        tier: Tier = strawberry.field(description='티어')

    @gql.mutation
    @requires_persona_context
    def join_membership(self, info: Info, join_input: JoinMembershipInput) \
            -> strawberry.union('MembershipJoinResult', (Membership,
                                                         AuthInfoRequiredError,
                                                         CookieContextRequiredError,
                                                         AlreadyJoinedMembershipError)):
        """
        특정 페르소나의 멤버쉽에 가입을 요청한다.
        """
        join_input = resolvers.parse_input(info, join_input)
        subscriber: Persona = info.context.request.persona
        creator: Persona = join_input['creator'].pk
        tier: Tier = join_input['tier']

        try:
            membership = create_membership(subscriber, creator, tier)
        except AlreadyJoinedException:
            raise AlreadyJoinedMembershipError()
        return membership

    @gql.django.input(models.Membership)
    class LeaveMembershipInput:
        """
        멤버쉽 가입 input
        """
        creator: auto = strawberry.field(description='구독 대상 페르소나')

    @gql.mutation
    @requires_persona_context
    def leave_membership(self, info: Info, leave_input: LeaveMembershipInput) \
            -> None | CookieContextRequiredError:
        """
        특정 페르소나의 멤버쉽에서 탈퇴한다.
        """
        leave_input = resolvers.parse_input(info, leave_input)
        subscriber: Persona = info.context.request.persona
        creator: Persona = leave_input['creator'].pk

        try:
            remove_membership(subscriber, creator)
        except MembershipNotFoundException:
            raise NotMemberError
