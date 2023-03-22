import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.resolvers.model_types import Category

from .errors import CategoryBodyDuplicatedError, CategoryBodyTooShortError, CategoryBodyTooLongError
from ..decorators import requires_auth
from ..errors import AdminPermissionRequiredError
from graphql_app.domain.category.validations import check_body_length
from ...domain.category.core import create_category
from ...domain.category.exceptions import DuplicatedCategoryBodyException


@gql.type
class Mutation:
    @strawberry.mutation
    @requires_auth  # TODO : DB 접근 가능해지면 admin_only로 바꾸기
    def category_create(self, info: Info, body: str) \
            -> strawberry.union('CreateCategoryResult', (Category,
                                                         AdminPermissionRequiredError,
                                                         CategoryBodyDuplicatedError,
                                                         CategoryBodyTooShortError,
                                                         CategoryBodyTooLongError)):
        """
        새 카테고리를 생성한다.
        """

        # body 길이 체크
        body_valid_result, required_length = check_body_length(body)
        if body_valid_result < 0:
            raise CategoryBodyTooShortError(body, required_length)
        elif body_valid_result > 0:
            raise CategoryBodyTooLongError(body, required_length)

        try:
            new_category = create_category(body)
        except DuplicatedCategoryBodyException:
            raise CategoryBodyDuplicatedError(body)
        else:
            return new_category
