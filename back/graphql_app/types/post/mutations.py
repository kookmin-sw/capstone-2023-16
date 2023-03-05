import typing

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers

from graphql_app.models import Post as PostModel
from graphql_app.types.decorators import requires_auth
from graphql_app.types.errors import AuthInfoRequiredError
from graphql_app.types.model_types import PostNode


@gql.type
class Mutation:
    @gql.django.input(PostModel)
    class CreatePostInput:
        """
        게시물 생성 input
        """
        title: gql.auto = strawberry.field(description='새 게시글 제목')
        content: gql.auto = strawberry.field(description='새 게시글 본문')

    # TODO: Type 수정
    @gql.mutation
    @requires_auth
    def post_create(self, info: Info, new_post_input: CreatePostInput) \
            -> typing.Union[PostNode, AuthInfoRequiredError]:
        """
        새 게시물을 생성한다.
        """
        new_post_input.user = info.context.request.user.id
        return resolvers.create(info, PostModel, resolvers.parse_input(info, vars(new_post_input)))
