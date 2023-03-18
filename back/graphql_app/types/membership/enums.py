from enum import Enum

import strawberry


@strawberry.enum
class Tier(Enum):
    TIER_1 = 1
    TIER_2 = 2
    TIER_3 = 3
    TIER_4 = 4
    TIER_5 = 5
    TIER_6 = 6


@strawberry.enum
class GetMembershipAs(Enum):
    SUBSCRIBER = "구독자로서 조회"
    CREATOR = "창작자로서 조회"
