import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import auto

from graphql_app.models import Membership
from graphql_app.types.decorators import requires_auth


@gql.type
class Mutation:
    @gql.django.input(Membership)
    class JoinMembershipInput:
        """
        멤버쉽 가입 input
        """
        subscriber: auto = strawberry.field(description='구독 요청 페르소나')
        creator: auto = strawberry.field(description='구독 대상 페르소나')
        tier: auto = strawberry.field(description='티어')

    @gql.mutation
    @requires_auth
    def join_member(self, info: Info, join_input: JoinMembershipInput):
        pass