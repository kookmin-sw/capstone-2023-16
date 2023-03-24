import strawberry
from strawberry.types.info import Info
from strawberry_django_plus import gql

from graphql_app.domain.tag.core import insert_tag
from graphql_app.domain.tag.validations import check_body_length
from graphql_app.resolvers.decorators import requires_auth
from graphql_app.resolvers.errors import AuthInfoRequiredError
from graphql_app.resolvers.tag.errors import TagBodyTooLongError, TagBodyTooShortError
from graphql_app.resolvers.tag.types import TagInsertionResult


@gql.type
class Mutation:
    @strawberry.mutation
    @requires_auth
    def tag_insert(self, info: Info, body: str) \
            -> strawberry.union('UpsertTagResult', (TagInsertionResult,
                                                    AuthInfoRequiredError,
                                                    TagBodyTooShortError, TagBodyTooLongError)):
        """
        새 태그를 생성한다.
        단, 중복되는 태그 이름이 있는 경우 기존의 태그를 반환한다.
        """
        # body 길이 체크
        body_valid_result, required_length = check_body_length(body)
        if body_valid_result < 0:
            raise TagBodyTooShortError(body, required_length)
        elif body_valid_result > 0:
            raise TagBodyTooLongError(body, required_length)

        tag, is_created = insert_tag(body)
        return TagInsertionResult(tag, is_created)
