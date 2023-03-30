from enum import Enum

import strawberry


@strawberry.enum
class CategorySortBy(Enum):
    """
    카테고리 정렬 기준
    """
    ID = strawberry.enum_value('id', description='')
    LEXICOGRAPHICAL = strawberry.enum_value('body', description='')
    CREATED_AT = strawberry.enum_value('created_at', description='')
    PERSONA_REFERENCE_CNT = strawberry.enum_value('persona_preference_cnt', description='선호 페르소나 수 기준')
    POST_CONNECTION_CNT = strawberry.enum_value('post_connection_cnt', description='연결된 게시물 수 기준')
