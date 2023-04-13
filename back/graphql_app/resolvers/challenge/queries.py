from typing import Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.resolvers.model_types import Challenge, ChallengeObjective

from graphql_app.domain.challenge.core import get_all_challenges, get_challenges_by_persona_id
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.challenge.core import get_challenge_objects_by_challenge_id


@gql.type
class ChallengeQuery:
    @gql.django.connection
    def get_all_challenges(self, info: Info) -> Iterable[Challenge]:
        challenges = get_all_challenges()
        return cast(Iterable[Challenge], challenges)

    @gql.django.connection
    def get_my_challenges(self, info: Info, persona_id: GlobalID) -> Iterable[Challenge]:
        persona_id: int = int(persona_id.node_id)
        challenges = get_challenges_by_persona_id(persona_id)
        return cast(Iterable[Challenge], challenges)

    @gql.django.connection
    def get_my_challenge_objectives(self, info: Info, persona_id: GlobalID, challenge_id: GlobalID) -> Iterable[ChallengeObjective]:
        persona_id: int = int(persona_id.node_id)
        challenge_id: int = int(challenge_id.node_id)
        challenges = get_challenge_objects_by_challenge_id(challenge_id, persona_id)
        return cast(Iterable[ChallengeObjective], challenges)
