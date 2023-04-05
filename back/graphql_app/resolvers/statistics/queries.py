from typing import Dict

import strawberry
from strawberry.types import Info
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.statistics.persona import get_following_personas_statistics, get_follower_personas_statistics
from graphql_app.resolvers.decorators import requires_persona_context
from graphql_app.domain.statistics.post import get_read_post_statistics, get_post_read_counts_by_day, \
    get_post_read_counts_by_hour, get_post_read_counts_by_weekday, get_post_read_counts_by_author, \
    get_post_reader_statistics
from graphql_app.resolvers.statistics.types import PostStatistics, FieldScore, GetOwnReadPostStatisticsInput, \
    PersonaStatistics, GetFollowingPersonaStatisticsInput, GetPersonaFollowerStatisticsInput, \
    PostReaderPersonaStatisticsInput, StatisticsDatetimeBetween, CountStatistics, CountStatisticsElement


@strawberry.type
class Query:
    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics(self, info: Info, opt: GetOwnReadPostStatisticsInput) -> PostStatistics:
        """
        사용자가 읽은 게시물에 대한 통계 정보를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics: Dict[str, Dict[str, int]] = get_read_post_statistics(persona_id, opt.result_limit,
                                                                         opt.datetime_between.start_datetime,
                                                                         opt.datetime_between.end_datetime)
        print(statistics)

        # Author 통계 처리
        for author_label in statistics['author_statistics'].keys():
            statistics['author_statistics'][author_label] = list(map(lambda x: FieldScore(**x),
                                                                     statistics['author_statistics'][author_label]))
        author_scores = PersonaStatistics(**statistics['author_statistics'])

        # 아래 반복문에 의해 FieldScore로 변환되지 않도록 빼줌
        statistics.pop('author_statistics')
        for field_name, field_scores in statistics.items():
            statistics[field_name] = list(map(lambda x: FieldScore(**x), statistics[field_name]))

        # Author를 제외한 통계 데이터의 인스턴스화가 끝났으므로, author 관련 통계 데이터를 넣어줌
        statistics['author_scores'] = author_scores

        return PostStatistics(**statistics)

    @strawberry.field
    @requires_persona_context
    def get_following_personas_statistics(self, info: Info,
                                          opt: GetFollowingPersonaStatisticsInput) -> PersonaStatistics:
        """
        요청한 페르소나가 팔로우 하고 있는 페르소나의 주요 특징을 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_following_personas_statistics(persona_id, opt.result_limit)
        for field_name, field_scores in statistics.items():
            statistics[field_name] = list(map(lambda x: FieldScore(**x), statistics[field_name]))
        return PersonaStatistics(**statistics)

    @strawberry.field
    def get_persona_followers_statistics(self, info: Info, opt: GetPersonaFollowerStatisticsInput) -> PersonaStatistics:
        """
        특정 페르소나의 팔로워 페르소나의 주요 특징을 반환한다.
        """
        statistics = get_follower_personas_statistics(opt.persona_id.node_id, opt.result_limit)
        for field_name, field_scores in statistics.items():
            statistics[field_name] = list(map(lambda x: FieldScore(**x), statistics[field_name]))
        return PersonaStatistics(**statistics)

    @strawberry.field
    def get_post_reader_statistics(self, info: Info, opt: PostReaderPersonaStatisticsInput) -> PersonaStatistics:
        """
        특정 게시물에 대한 독자 페르소나의 주요 특징을 반환한다.
        """
        statistics = get_post_reader_statistics(opt.post_id.node_id, opt.min_revisit, opt.result_limit)
        for field_name, field_scores in statistics.items():
            statistics[field_name] = list(map(lambda x: FieldScore(**x), statistics[field_name]))
        return PersonaStatistics(**statistics)

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_day(self, info: Info, between: StatisticsDatetimeBetween) \
            -> CountStatistics:
        """
        사용자의 일별 읽은 게시물의 수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_post_read_counts_by_day(persona_id, between.start_datetime, between.end_datetime)
        result = [CountStatisticsElement(label=date, count=count) for date, count in statistics.items()]
        result.sort(key=lambda x: x.label)
        return CountStatistics(unit='날짜(일단위)', elements=result, total_count=sum(statistics.values()))

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_hour(self, info: Info, between: StatisticsDatetimeBetween) \
            -> CountStatistics:
        """
        사용자의 시간대별 읽은 게시물의 갯수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_post_read_counts_by_hour(persona_id, between.start_datetime, between.end_datetime)
        result = [CountStatisticsElement(label=hour, count=count) for hour, count in statistics.items()]
        result.sort(key=lambda e: int(e.label))

        return CountStatistics(unit='시', elements=result, total_count=sum(statistics.values()))

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_weekday(self, info: Info, between: StatisticsDatetimeBetween) \
            -> CountStatistics:
        """
        사용자의 요일별 읽은 게시물의 갯수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_post_read_counts_by_weekday(persona_id, between.start_datetime, between.end_datetime)
        result = [CountStatisticsElement(label=weekday, count=count) for weekday, count in statistics.items()]
        result.sort(key=lambda e: '월화수목금토일'.find(e.label))

        return CountStatistics(unit='요일', elements=result, total_count=sum(statistics.values()))

    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics_per_author(self, info: Info,
                                                between: StatisticsDatetimeBetween) -> CountStatistics:
        """
        사용자가 일정 기간 동안 읽은 게시물들의 포스트를 기준으로 갯수를 반환한다.
        """
        persona_id = info.context.request.persona.id
        statistics = get_post_read_counts_by_author(persona_id, between.start_datetime, between.end_datetime)
        result = [CountStatisticsElement(label=str(GlobalID(type_name='Persona', node_id=str(i))),
                                         count=v)
                  for i, v in statistics.items()]
        result.sort(key=lambda e: e.count, reverse=True)
        return CountStatistics(unit="페르소나 ID", total_count=sum(statistics.values()), elements=result)
