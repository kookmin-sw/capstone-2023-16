from typing import Dict

import strawberry
from strawberry.types import Info
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.statistics.post import get_read_post_statistics, get_post_read_counts_by_day, \
    get_post_read_counts_by_hour, get_post_read_counts_by_weekday, get_favorite_personas_statistics
from graphql_app.resolvers.decorators import requires_persona_context
from graphql_app.resolvers.statistics.types import PostStatistics, FieldScore, GetOwnReadPostStatisticsInput, \
    StatisticsDatetimeBetween, PostReadStatisticsPerDay, PostReadStatisticsPerDayElement, PostReadStatisticsPerWeekday, \
    PostReadStatisticsPerWeekdayElement, PostReadStatisticsPerHour, PostReadStatisticsPerHourElement, \
    FavoritePersonasStatisticsElement, FavoritePersonasStatistics


@strawberry.type
class Query:
    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics(self, info: Info, opt: GetOwnReadPostStatisticsInput) -> PostStatistics:
        """
        사용자가 읽은 게시물에 대한 통계 정보를 반환한다.
        """

        persona_id = info.context.request.persona.id
        statistics: Dict[str, Dict[str, int]] = get_read_post_statistics(persona_id, opt.record_limit, opt.result_limit,
                                                                         opt.start_datetime, opt.end_datetime)

        for field_name, field_scores in statistics.items():
            statistics[field_name] = list(map(lambda x: FieldScore(**x), statistics[field_name]))
        return PostStatistics(**statistics)

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_day(self, info: Info, opt: StatisticsDatetimeBetween) \
            -> PostReadStatisticsPerDay:
        """
        사용자의 일별 읽은 게시물의 수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        result = get_post_read_counts_by_day(persona_id, opt.start_datetime, opt.end_datetime)
        result = [PostReadStatisticsPerDayElement(date=date, count=count) for date, count in result.items()]
        result.sort(key=lambda x: x.date)
        result = PostReadStatisticsPerDay(elements=result)
        return result

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_hour(self, info: Info, opt: StatisticsDatetimeBetween) \
            -> PostReadStatisticsPerHour:
        """
        사용자의 시간대별 읽은 게시물의 갯수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_post_read_counts_by_hour(persona_id, opt.start_datetime, opt.end_datetime)
        result = [PostReadStatisticsPerHourElement(hour=k, count=v) for k, v in statistics.items()]
        result.sort(key=lambda e: e.hour)

        return PostReadStatisticsPerHour(total_count=sum(statistics.values()),
                                         elements=result)

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_weekday(self, info: Info, opt: StatisticsDatetimeBetween) \
            -> PostReadStatisticsPerWeekday:
        """
        사용자의 요일별 읽은 게시물의 갯수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_post_read_counts_by_weekday(persona_id, opt.start_datetime, opt.end_datetime)
        result = [PostReadStatisticsPerWeekdayElement(weekday=k, count=v) for k, v in statistics.items()]
        result.sort(key=lambda e: e.weekday)

        return PostReadStatisticsPerWeekday(total_count=sum(statistics.values()),
                                            elements=result)

    @strawberry.field
    @requires_persona_context
    def get_favorite_personas_statistics(self, info: Info,
                                         opt: StatisticsDatetimeBetween) -> FavoritePersonasStatistics:
        """
        사용자가 일정 기간 동안 가장 많이 읽은 창작자 페르소나의 목록과 해당 페르소나의 게시물 중 읽은 게시물의 갯수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_favorite_personas_statistics(persona_id, opt.start_datetime, opt.end_datetime)
        result = [FavoritePersonasStatisticsElement(author_id=str(GlobalID(type_name='Persona', node_id=str(i))),
                                                    count=v)
                  for i, v in statistics.items()]
        result.sort(key=lambda e: e.count, reverse=True)
        return FavoritePersonasStatistics(total_count=sum(statistics.values()),
                                          elements=result)
