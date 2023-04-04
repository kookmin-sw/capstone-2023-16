from typing import List, Optional
from datetime import datetime, timedelta, date

import strawberry
from graphene import Date
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.statistics.utils import get_day_before_30_days
from graphql_app.resolvers.statistics.enums import WeekDay


@strawberry.input
class GetOwnReadPostStatisticsInput:
    record_limit: Optional[int] = strawberry.field(default=100, description='통계에 사용할 데이터의 최대 개수')
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')
    start_datetime: Optional[datetime] = strawberry.field(default_factory=get_day_before_30_days,
                                                          description='조회 시작 일시 (기본값 : 30일 이전)')
    end_datetime: Optional[datetime] = strawberry.field(default_factory=datetime.now,
                                                        description='조회 종료 일시 (기본값 : 오늘)')


@strawberry.input
class StatisticsDatetimeBetween:
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


@strawberry.type
class PostReadStatisticsPerDay:
    """
    일별 읽은 게시물 개수 통계
    """
    elements: List['PostReadStatisticsPerDayElement'] = strawberry.field(description='날짜별 읽은 개수')


@strawberry.type
class PostReadStatisticsPerDayElement:
    """
    일별 읽은 게시물 개수 통계 (요소)
    date에 count개의 게시물을 읽었음을 의미함
    """
    date: str = strawberry.field(description='날짜')
    count: int = strawberry.field(description='읽은 게시물 개수')


@strawberry.type
class PostReadStatisticsPerHour:
    """
    시간대별 읽은 게시물 개수 통계
    """
    total_count: int = strawberry.field(description='총 읽은 수')
    elements: List['PostReadStatisticsPerHourElement'] = strawberry.field(description='통계 결과')


@strawberry.type
class PostReadStatisticsPerHourElement:
    """
    시간대별 읽은 게시물 개수 통계
    hour시에 count개의 게시물을 읽었음을 의미함
    """
    hour: int = strawberry.field(description='시')
    count: int = strawberry.field(description='읽은 게시물 개수')


@strawberry.type
class PostReadStatisticsPerWeekday:
    """
    요일별 읽은 게시물 개수 통계
    """
    total_count: int = strawberry.field(description='총 읽은 수')
    elements: List['PostReadStatisticsPerWeekdayElement'] = strawberry.field(description='통계 결과')


@strawberry.type
class PostReadStatisticsPerWeekdayElement:
    """
    요일별 읽은 게시물 개수 통계 (요소)
    weekday에 count개의 게시물을 읽었음을 의미함
    """
    weekday: WeekDay = strawberry.field(description='요일')
    count: int = strawberry.field(description='읽은 게시물 개수')


@strawberry.type
class FavoritePersonasStatistics:
    """
    가장 게시물을 많이 읽은 창작자 페르소나들과 읽은 게시물의 수 통계
    """
    total_count: int = strawberry.field(description='총 읽은 수')
    elements: List['FavoritePersonasStatisticsElement'] = strawberry.field(description='통계 결과')


@strawberry.type
class FavoritePersonasStatisticsElement:
    """
    가장 게시물을 많이 읽은 창작자 페르소나들과 읽은 게시물의 수 통계 (요소)
    """
    author_id: GlobalID = strawberry.field(description='창작자 ID')
    count: int = strawberry.field(description='읽은 게시물 개수')
