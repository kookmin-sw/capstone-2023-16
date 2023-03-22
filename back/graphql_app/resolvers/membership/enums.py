from enum import Enum

import strawberry


@strawberry.enum
class GetMembershipAs(Enum):
    SUBSCRIBER = strawberry.enum_value('subscriber', description='구독자로서 조회')
    CREATOR = strawberry.enum_value('creator', description='창작자로서 조회')
