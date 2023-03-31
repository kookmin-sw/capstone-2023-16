import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.domain.category.exceptions import CategoryNotFoundException
from graphql_app.domain.persona.exceptions import PersonaNotFoundException
from graphql_app.domain.post.core import create_post
from graphql_app.resolvers.decorators import requires_auth
from graphql_app.resolvers.errors import AuthInfoRequiredError, ResourceNotFoundError
from graphql_app.resolvers.model_types import Post
from graphql_app.resolvers.post.types import CreatePostInput


@gql.type
class Mutation:
    # TODO: Type 수정
    @gql.mutation
    @requires_auth
    def post_create(self, info: Info, new_post_input: CreatePostInput) \
            -> strawberry.union('CreatePostResult', (Post,
                                                     AuthInfoRequiredError, ResourceNotFoundError)):
        """
        새 게시물을 생성한다.
        """

        # _, author_id =
        author_id = int(new_post_input.author.id.node_id)
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
