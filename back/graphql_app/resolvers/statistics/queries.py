from typing import Optional, Dict, List

import strawberry
from strawberry.types import Info

from graphql_app.domain.statistics.post import get_post_statistics
from graphql_app.resolvers.decorators import requires_persona_context
from graphql_app.resolvers.statistics.types import PostStatistics, FieldScore, GetOwnReadPostStatisticsInput


@strawberry.type
class Query:
    @strawberry.field
    @requires_persona_context
    def get_own_read_post_statistics(self, info: Info, opt: GetOwnReadPostStatisticsInput) -> PostStatistics:
        """
        사용자가 읽은 게시물에 대한 통계 정보를 반환한다.
        """

        persona_id = info.context.request.persona.id
        statistics: Dict[str, Dict[str, int]] = get_post_statistics(persona_id, opt.record_limit, opt.result_limit,
                                                                    opt.start_datetime, opt.end_datetime)

        for field_name, field_scores in statistics.items():
            statistics[field_name] = list(map(lambda x: FieldScore(**x), statistics[field_name]))
        return PostStatistics(**statistics)
