from enum import Enum

import strawberry


@strawberry.enum
class Job(Enum):
    STUDENT = '학생'
    EDUCATOR = '교육자'
    JOB_SEEKER = '취업 준비생'
    EMPLOYEE = '회사원'
    IT = 'IT 계열 종사자'
    FINANCE = '금융'
    ART = '예술'
    ETC = '기타'
