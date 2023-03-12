from typing import Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import relay, gql

from graphql_app.models import Category as CategoryModel
from graphql_app.types.model_types import Category


@gql.type
class Query:
    @gql.django.connection
    def get_all_categories(self, info: Info) -> Iterable[Category]:
        """
        시스템에 등록된 모든 카테고리의 목록
        """
        return cast(Iterable[Category], CategoryModel.objects.all())
