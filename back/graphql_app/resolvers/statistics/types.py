from typing import List, Optional
from datetime import datetime

import strawberry
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.statistics.utils import get_day_before_30_days


@strawberry.type
class FieldScore:
    """
    특정 항목의 점수를 표시하기 위한 타입
    """
    label: str = strawberry.field(description='항목의 이름')
    score: int = strawberry.field(description='점수')


@strawberry.type
class CountStatisticsElement:
    """
    특정 항목의 이름 및 개수
    """
    label: str = strawberry.field(description='항목 이름')
    count: int = strawberry.field(description='항목 집계 횟수')


@strawberry.type
class CountStatistics:
    """
    항목별 개수 통계
    """
    unit: str = strawberry.field(description='단위')
    total_count: int = strawberry.field(description='총 개수')
    elements: List[CountStatisticsElement] = strawberry.field(description='단위별 항목 개수')


@strawberry.input
class StatisticsDatetimeBetween:
    """
    통계에 사용할 데이터의 날짜 범위
    """
    start_datetime: Optional[datetime] = strawberry.field(default_factory=get_day_before_30_days,
                                                          description='조회 시작 일시 (기본값 : 30일 이전)')
    end_datetime: Optional[datetime] = strawberry.field(default_factory=datetime.now,
                                                        description='조회 종료 일시 (기본값 : 오늘)')

    @classmethod
    def get_default(cls):
        start_datetime = get_day_before_30_days()
        end_datetime = datetime.now()
        return cls(start_datetime=start_datetime, end_datetime=end_datetime)


@strawberry.type
class PersonaStatistics:
    """
    게시물 관련 통계 데이터 묶음
    """
    tag_scores: List[FieldScore] = strawberry.field(description='태그 점수')
    category_scores: List[FieldScore] = strawberry.field(description='카테고리 점수')
    gender_scores: List[FieldScore] = strawberry.field(description='성별 점수')
    birth_year_scores: List[FieldScore] = strawberry.field(description='생년 점수')
    job_scores: List[FieldScore] = strawberry.field(description='직업 점수')


@strawberry.type
class PostStatistics:
    """
    게시물 관련 통계 데이터 묶음
    """
    tag_scores: List[FieldScore] = strawberry.field(description='태그 점수')
    category_scores: List[FieldScore] = strawberry.field(description='카테고리 점수')
    author_scores: PersonaStatistics = strawberry.field(description='작성자 페르소나의 주요 특징')


@strawberry.input
class PostStatisticsInput:
    """
    특정 게시물을 기준으로 통계를 내기 위한 입력
    """
    post_id: GlobalID = strawberry.field(description='조회할 게시물의 ID')
    result_limit: Optional[int] = strawberry.field(default=20, description='응답될 항목의 최대 개수')
    datetime_between: StatisticsDatetimeBetween = strawberry.field(description='조회 기록 날짜 범위')


@strawberry.input
class PersonaStatisticsInput:
    """
    특정 페르소나를 기준으로 통계를 내기 위한 입력
    """
    persona_id: GlobalID = strawberry.field(description='조회할 페르소나의 ID')
    result_limit: Optional[int] = strawberry.field(default=20, description='응답될 항목의 최대 개수')


@strawberry.input
class PostReaderPersonaStatisticsInput:
    """
    특정 게시물에 대한 독자 페르소나의 주요 특징을 반환 받기 위한 입력
    """
    post_id: GlobalID = strawberry.field(description='대상 게시물의 ID')
    min_revisit: int = strawberry.field(default=1, description='재방문 횟수 하한')
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')


@strawberry.input
class GetOwnReadPostStatisticsInput:
    """
    요청한 사용자가 읽은 게시물에 대한 통계를 내기 위한 입력
    """
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')
    datetime_between: StatisticsDatetimeBetween = strawberry.field(description='조회 기록 날짜 범위')


@strawberry.input
class GetPostReaderStatisticsInput:
    post_id: GlobalID = strawberry.field(description='대상 게시물의 ID')
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')


@strawberry.input
class GetPostRevisitedReaderStatisticsInput:
    post_id: GlobalID = strawberry.field(description='대상 게시물의 ID')
    min_revisit: int = strawberry.field(default=2, description='재방문 기준 횟수')
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')


@strawberry.input
class GetFollowingPersonaStatisticsInput:
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')


@strawberry.input
class GetPersonaFollowerStatisticsInput:
    persona_id: GlobalID = strawberry.field(description='조회 대상 페르소나의 ID')
    result_limit: Optional[int] = strawberry.field(default=100, description='응답될 항목의 최대 개수')
