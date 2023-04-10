from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus import gql

@gql.type
class ChallengeMutation:
    @gql.mutation
    def create_challenge(self, info: Info, input: CreateChallengeObjectiveInput) -> ModelNode:
        data = vars(input)
        node_id: gql.relay.GlobalID = data.pop('id')
        asset: Asset = node_id.resolve_node(info, ensure_type=Asset)

        if asset.owner != info.context.request.user:
            raise PermissionError("You can only modify objects you own.")

        return resolvers.update(info, asset, resolvers.parse_input(info, data))
