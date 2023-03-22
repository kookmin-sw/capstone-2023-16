from enum import Enum
from typing import Optional

import strawberry

from graphql_app.resolvers.enums import SortingDirection


@strawberry.enum
class MembershipSortBy(Enum):
    """
    멤버쉽 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    SUBSCRIBER_NICKNAME = strawberry.enum_value('subscriber__nickname', description='구독자 닉네임')
    CREATOR_NICKNAME = strawberry.enum_value('creator_nickname', description='창작자 닉네임')
    TIER = strawberry.enum_value('tier', description='티어')


@strawberry.input
class MembershipSortingOption:
    """
    멤버쉽 목록 조회시 적용할 정렬 방법
    """
    sort_by: Optional[MembershipSortBy] = strawberry.field(default=MembershipSortBy.ID, description='정렬 기준')
    direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')
