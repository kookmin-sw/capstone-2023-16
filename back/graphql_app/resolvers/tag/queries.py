from typing import Iterable, cast, Optional

from strawberry.types import Info
from strawberry_django_plus import gql, relay

from graphql_app.domain.tag.core import get_all_tags
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Tag
from graphql_app.resolvers.tag.types import TagSortingOption, TagBodyFilter


@gql.type
class Query:
    tag: Optional[Tag] = relay.node()

    @gql.django.connection
    def get_all_tags(self, info: Info,
                     sorting_opt: TagSortingOption,
                     created_at_filter: Optional[DatetimeBetween] = None,
                     body_filter: Optional[TagBodyFilter] = None) -> Iterable[Tag]:
        """
        등록된 모든 태그의 목록
        """
        filters = (created_at_filter, body_filter)
        tags = get_all_tags(sorting_opt, filters)
        return cast(Iterable[Tag], tags)
