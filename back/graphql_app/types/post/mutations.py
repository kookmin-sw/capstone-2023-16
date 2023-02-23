from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus.permissions import IsAuthenticated

from graphql_app.models import Post as PostModel
from graphql_app.types.model_types import PostNode


@gql.django.input(PostModel)
class CreatePostInput:
    title: gql.auto
    content: gql.auto


@gql.type
class Mutation:
    # TODO: Type 수정
    # noinspection PyTypeChecker
    @gql.mutation(directives=[IsAuthenticated()])
    def post_create(self, info: Info, new_post_input: CreatePostInput) -> PostNode:
        new_post_input.user_id = info.context.request.user.id
        return resolvers.create(info, PostModel, resolvers.parse_input(info, vars(new_post_input)))
