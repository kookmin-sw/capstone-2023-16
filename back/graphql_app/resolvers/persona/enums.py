from enum import Enum

import strawberry


@strawberry.enum
class PersonaSortBy(Enum):
    """
    페르소나 정렬 기준
    """
    ID = strawberry.enum_value('id', description='ID')
    NICKNAME = strawberry.enum_value('nickname', description='닉네임')
    CREATED_AT = strawberry.enum_value('created_at', description='생성 일시')
    TOTAL_POST_READ_CNT = strawberry.enum_value('total_post_read_cnt', description='게시물 총 조회수')
    FOLLOWER_CNT = strawberry.enum_value('follower_cnt', description='팔로워 수')


@strawberry.enum
class Job(Enum):
    """
    페르소나 직업
    """
    STUDENT = '학생'
    EDUCATOR = '교육자'
    JOB_SEEKER = '취업 준비생'
    EMPLOYEE = '회사원'
    IT = 'IT 계열 종사자'
    FINANCE = '금융'
    ART = '예술'
    ETC = '기타'
