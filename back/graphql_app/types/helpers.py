from datetime import datetime
from typing import Optional

import strawberry


@strawberry.input
class DatetimeBetween:
    """
    특정 날짜/시각 사이의 범위에 해당되는 데이터를 받아 오기 위한 인터페이스
    """
    start_dt: Optional[datetime] = strawberry.field(default=None, description='조회 시작 일시')
    end_dt: Optional[datetime] = strawberry.field(default_factory=datetime.now, description='조회 종료 일시')
