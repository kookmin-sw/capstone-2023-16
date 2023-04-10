import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.category.exceptions import CategoryNotFoundException
from graphql_app.domain.persona.exceptions import PersonaNotFoundException
from graphql_app.domain.post.core import create_post, post_like_toggle
from graphql_app.resolvers.decorators import requires_persona_context
from graphql_app.resolvers.errors import AuthInfoRequiredError, ResourceNotFoundError
from graphql_app.resolvers.model_types import Post
from graphql_app.resolvers.post.types import CreatePostInput
from graphql_app.resolvers.utils import parse_global_id


@gql.type
class Mutation:
    # TODO: Type 수정
    @gql.mutation
    @requires_persona_context
    def post_create(self, info: Info, new_post_input: CreatePostInput) \
            -> strawberry.union('CreatePostResult', (Post,
                                                     AuthInfoRequiredError, ResourceNotFoundError)):
        """
        새 게시물을 생성한다.
        """

        author_id = info.context.request.persona.id
        requested_user_id = int(info.context.request.user.id)
        category_id = int(new_post_input.category.id.node_id)
        title = new_post_input.title
        content = new_post_input.content
        paid_content = new_post_input.paid_content
        tag_bodies = new_post_input.tag_bodies

        try:
            new_post = create_post(author_id=author_id, requested_user_id=requested_user_id,
                                   title=title, content=content, paid_content=paid_content,
                                   category_id=category_id, tag_bodies=tag_bodies)
        except PersonaNotFoundException:
            raise ResourceNotFoundError('Persona')
        except CategoryNotFoundException:
            raise ResourceNotFoundError('Category')
        else:
            return new_post

    @gql.mutation
    @requires_persona_context
    def post_like_toggle(self, info: Info, post_id: GlobalID) -> bool:
        """
        특정 게시물에 대한 좋아요 토글을 수행한다.
        수행 결과 좋아요 상태가 되었다면 True, 그렇지 않다면 False를 반환한다.
        """
        persona_id = info.context.request.persona.id
        _, post_id = parse_global_id(str(post_id))
        liked = post_like_toggle(post_id, persona_id)
        return liked
