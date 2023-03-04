from enum import Enum

import strawberry


@strawberry.enum
class Gender(Enum):
    MALE = '남성'
    FEMALE = '여성'


@strawberry.enum
class SortingDirection(Enum):
    """
    정렬 오름차순/내림차순
    """
    ASC = 'ascending'
    DESC = 'descending'
