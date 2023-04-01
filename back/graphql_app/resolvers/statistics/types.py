from typing import List

import strawberry


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
