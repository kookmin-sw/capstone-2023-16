from typing import List, Optional
from datetime import datetime, timedelta

import strawberry

from graphql_app.domain.statistics.utils import get_day_before_30_days


@strawberry.input
class GetOwnReadPostStatisticsInput:
    record_limit: Optional[int] = strawberry.field(default=100, description='통계에 사용할 데이터의 최대 갯수')
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 갯수')
    start_datetime: Optional[datetime] = strawberry.field(default_factory=get_day_before_30_days,
                                                          description='조회 시작 일시 (기본값 : 30일 이전)')
    end_datetime: Optional[datetime] = strawberry.field(default_factory=datetime.now,
                                                        description='조회 종료 일시 (기본값 : 오늘)')


@strawberry.type
class FieldScore:
    label: str = strawberry.field(description='항목의 이름')
    score: int = strawberry.field(description='점수')


@strawberry.type
class PostStatistics:
    """
    게시물 관련 통계 데이터 묶음
    """
    tag_scores: List[FieldScore] = strawberry.field(description='태그 점수')
    category_scores: List[FieldScore] = strawberry.field(description='카테고리 점수')
