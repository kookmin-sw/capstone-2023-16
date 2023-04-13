from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus import gql
from strawberry.types import Info

from graphql_app.resolvers.challenge.types import CreateChallengeObjectiveInput, CreateChallengeInput, \
    ToggleChallengeObjectiveInput
from graphql_app.models import Challenge as ChallengeModel, ChallengeObjective as ChallengeObjectiveModel, ChallengeObjectiveHistory as ChallengeObjectiveHistoryModel
from graphql_app.resolvers.model_types import Challenge, ChallengeObjectiveHistory, ChallengeObjective
from strawberry_django_plus.relay import GlobalID

from graphql_app.models import Persona


@gql.type
class ChallengeMutation:
    @gql.mutation
    def create_challenge(self, info: Info, input: CreateChallengeInput) -> Challenge:
        data = vars(input)
        return resolvers.create(info, ChallengeModel, resolvers.parse_input(info, data))

    @gql.mutation
    def create_challenge_objective(self, info: Info, input: CreateChallengeObjectiveInput) -> ChallengeObjective:
        data = vars(input)
        return resolvers.create(info, ChallengeObjectiveModel, resolvers.parse_input(info, data))

    @gql.mutation
    def toggle_challenge_objective(self, info: Info, input: ToggleChallengeObjectiveInput) -> ChallengeObjectiveHistory:
        data = vars(input)
        return resolvers.create(info, ChallengeObjectiveHistoryModel, resolvers.parse_input(info, data))

    @gql.django.input_mutation
    def join_challenge(self, info: Info, challenge_id: GlobalID, persona_id: GlobalID) -> Challenge:
        persona = Persona.objects.get(id=persona_id.node_id)

        challenge = challenge_id.resolve_node(info)
        challenge.personas.add(persona)
        challenge.save()
        return challenge
