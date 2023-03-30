from enum import Enum

import strawberry


@strawberry.enum
class PostSortBy(Enum):
    """
    게시물 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    READ_CNT = strawberry.enum_value('read_count', description='조회수')
