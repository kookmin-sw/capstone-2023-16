from typing import Optional, List

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers

from graphql_app.models import Post as PostModel, Tag as TagModel
from graphql_app.types.decorators import requires_auth
from graphql_app.types.errors import AuthInfoRequiredError
from graphql_app.types.model_types import Post


@gql.type
class Mutation:
    @gql.django.input(PostModel)
    class CreatePostInput:
        """
        게시물 생성 input
        """
        title: gql.auto = strawberry.field(description='새 게시글 제목')
        content: gql.auto = strawberry.field(description='새 게시글 본문')
        tag_bodies: Optional[List[str]] = strawberry.field(default_factory=list,
                                                           description='연결할 태그의 body 목록 (upsert됨)')

    # TODO: Type 수정
    @gql.mutation
    @requires_auth
    def post_create(self, info: Info, new_post_input: CreatePostInput) \
            -> strawberry.union('CreatePostResult', (Post, AuthInfoRequiredError)):
        """
        새 게시물을 생성한다.
        """
        new_post_input.user = info.context.request.user.id
        new_post = resolvers.create(info, PostModel, resolvers.parse_input(info, vars(new_post_input)))

        # 태그 처리
        tags = list(map(lambda pair: pair[0], TagModel.upsert_tags(new_post_input.tag_bodies)))
        new_post.tags.add(*tags)

        return new_post
