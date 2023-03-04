import strawberry
from strawberry.types.info import Info
from strawberry_django_plus import gql

from graphql_app import models
from graphql_app.types.model_types import Tag
from graphql_app.types.decorators import requires_auth
from graphql_app.types.errors import AuthInfoRequiredError
from graphql_app.types.tag.errors import TagBodyTooLongError, TagBodyTooShortError


@gql.type
class Mutation:
    @strawberry.type
    class TagUpsertOutput:
        """
        Tag upsert 결과
        """
        tag: Tag = strawberry.field(description='Upsert된 태그')
        is_created: bool = strawberry.field(description='새로 생성된 경우 true, 아닌 경우 false')

        def __init__(self, tag: Tag, is_created: bool):
            self.tag = tag
            self.is_created = is_created

    @strawberry.mutation
    @requires_auth
    def upsert_tag(self, info: Info, body: str) \
            -> strawberry.union('UpsertTagResult', (TagUpsertOutput,
                                                    AuthInfoRequiredError,
                                                    TagBodyTooShortError, TagBodyTooLongError)):
        """
        새 태그를 생성한다.
        단, 중복되는 태그 이름이 있는 경우 기존의 태그를 반환한다.
        """

        body_len_check = models.Tag.check_length(body)
        if body_len_check < 0:
            raise TagBodyTooShortError(body, Mutation.MIN_TAG_BODY_LEN)
        elif body_len_check > 0:
            raise TagBodyTooLongError(body, Mutation.MAX_TAG_BODY_LEN)

        tag, is_created = models.Tag.objects.get_or_create(body=body)
        return Mutation.TagUpsertOutput(tag, is_created)
