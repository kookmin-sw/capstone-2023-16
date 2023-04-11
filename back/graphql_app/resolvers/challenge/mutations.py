from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus import gql
from strawberry.types import Info

from graphql_app.resolvers.challenge.types import CreateChallengeObjectiveInput, CreateChallengeInput, \
    CreateChallengeHistoryInput
from graphql_app.models import Challenge as ChallengeModel, ChallengeObjective as ChallengeObjectiveModel, \
    ChallengeObjective, ChallengeHistory as ChallengeHistoryModel
from graphql_app.resolvers.model_types import Challenge, ChallengeHistory


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
    def create_challenge_history(self, info: Info, input: CreateChallengeHistoryInput) -> ChallengeHistory:
        data = vars(input)
        return resolvers.create(info, ChallengeHistoryModel, resolvers.parse_input(info, data))
