from enum import Enum

import strawberry


@strawberry.enum
class TagSortBy(Enum):
    """
    태그 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    LEXICOGRAPHICAL = strawberry.enum_value('body', description='사전순')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    PERSONA_PREFERENCE_CNT = strawberry.enum_value('persona_preference_cnt', description='선호 페르소나 수 기준')
    POST_CONNECTION_CNT = strawberry.enum_value('post_connection_cnt', description='연결된 게시물 수 기준')
