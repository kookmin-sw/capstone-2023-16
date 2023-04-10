from typing import Iterable, cast, Optional

from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.domain.category.core import get_all_categories
from graphql_app.resolvers.category.types import CategorySortingOption, CategoryBodyFilter
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Challenge


@gql.type
class Query:
    @gql.django.connection
    def get_all_challenges(self, info: Info,
                           sorting_opt: CategorySortingOption,
                           created_at_filter: Optional[DatetimeBetween] = None,
                           body_filter: Optional[CategoryBodyFilter] = None
                           ) -> Iterable[Challenge]:
        challenges = []
        return cast(Iterable[Challenge], challenges)
