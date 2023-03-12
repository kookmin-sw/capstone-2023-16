from typing import Optional, List

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers

from graphql_app import models
from graphql_app.types.decorators import requires_auth
from graphql_app.types.errors import AuthInfoRequiredError, ResourceNotFoundError
from graphql_app.types.model_types import Post


@gql.type
class Mutation:
    @gql.django.input(models.Post)
    class CreatePostInput:
        """
        게시물 생성 input
        """
        author: gql.auto = strawberry.field(description='작성자 Persona 정보')
        title: str = strawberry.field(description='새 게시글 제목')
        content: str = strawberry.field(description='새 게시글 본문')
        tag_bodies: Optional[List[str]] = strawberry.field(default_factory=list,
                                                           description='연결할 태그의 body 목록 (insert 됨)')
        category: gql.auto = strawberry.field(description='소속 카테고리')

    # TODO: Type 수정
    @gql.mutation
    @requires_auth
    def post_create(self, info: Info, new_post_input: CreatePostInput) \
            -> strawberry.union('CreatePostResult', (Post,
                                                     AuthInfoRequiredError, ResourceNotFoundError)):
        """
        새 게시물을 생성한다.
        """

        try:
            new_post_input = resolvers.parse_input(info, new_post_input)

            author_persona = new_post_input['author'].pk
            author_persona_owner: models.User = author_persona.owner

            # 요청자가 게시글 작성자로 지정된 페르소나의 소유자가 아닌 경우 에러 발생
            if author_persona_owner != info.context.request.user:
                raise models.Persona.DoesNotExist
        except models.Persona.DoesNotExist:
            raise ResourceNotFoundError('Persona')

        new_post = resolvers.create(info, models.Post, new_post_input)

        # 태그 연결 처리
        tags = list(map(lambda pair: pair[0], models.Tag.insert_tags(new_post_input['tag_bodies'])))
        new_post.tags.add(*tags)

        return new_post
