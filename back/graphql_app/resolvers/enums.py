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
    ASC = '오름차순'
    DESC = '내림차순'


@strawberry.enum
class StringFindMode(Enum):
    EXACTLY = '정확하게 같은 문자열 (A == B)'
    CONTAINS = '포함하는 문자열 (A in B)'
    STARTS_WITH = '앞부분과 일치하는 문자열 (B startswith A)'
    ENDS_WITH = '뒷부분과 일치하는 문자열 (B endswith A)'


@strawberry.enum
class SequentialConnectionMode(Enum):
    AND = 'AND'
    OR = 'OR'
