from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus import gql
from strawberry.types import Info

from graphql_app.resolvers.model_types import Challenge
from graphql_app.resolvers.challenge.types import CreateChallengeObjectiveInput

@gql.type
class ChallengeMutation:
    @gql.mutation
    def create_challenge(self, info: Info, input: CreateChallengeObjectiveInput) -> Challenge:
        data = vars(input)
        node_id: gql.relay.GlobalID = data.pop('id')

        return resolvers.create(info, Challenge, resolvers.parse_input(info, data))

