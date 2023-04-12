from typing import Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.resolvers.model_types import Challenge

from graphql_app.domain.challenge.core import get_all_challenges


@gql.type
class ChallengeQuery:
    @gql.django.connection
    def get_all_challenges(self, info: Info) -> Iterable[Challenge]:
        # get_all_challenges by current user id
        challenges = get_all_challenges()
        return cast(Iterable[Challenge], challenges)
