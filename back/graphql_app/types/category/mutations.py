import strawberry
from django.db import IntegrityError
from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app import models
from graphql_app.types.model_types import Category

from .errors import CategoryBodyDuplicatedError, CategoryBodyTooShortError, CategoryBodyTooLongError
from ..decorators import admin_only
from ..errors import AdminPermissionRequiredError


@gql.type
class Mutation:
    @strawberry.mutation
    @admin_only
    def category_create(self, info: Info, body: str) \
            -> strawberry.union('CreateCategoryResult', (Category,
                                                         AdminPermissionRequiredError,
                                                         CategoryBodyDuplicatedError,
                                                         CategoryBodyTooShortError,
                                                         CategoryBodyTooLongError)):
        """
        새 카테고리를 생성한다.
        """

        body_len_check = models.Category.check_length(body)
        if body_len_check < 0:
            raise CategoryBodyTooShortError(body, models.Category.MIN_CATEGORY_BODY_LEN)
        elif body_len_check > 0:
            raise CategoryBodyTooLongError(body, models.Category.MAX_CATEGORY_BODY_LEN)

        try:
            new_category = models.Category.objects.create(body=body)
        # 중복된 카테고리인 경우
        except IntegrityError:
            raise CategoryBodyDuplicatedError(body)
        else:
            return new_category
