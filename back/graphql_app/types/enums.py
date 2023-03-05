from enum import Enum

import strawberry


@strawberry.enum
class Gender(Enum):
    MALE = '남성'
    FEMALE = '여성'
