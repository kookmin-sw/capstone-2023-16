from collections import defaultdict, Counter
from datetime import datetime
from typing import Dict, Tuple, List

from graphql_app.models import PostReadingRecord


def get_read_post_statistics(reader_id: int, record_limit: int, result_limit: int, start_dt: datetime, end_dt: datetime) \
        -> Dict[str, Dict[str, int]]:
    """
    특정 페르소나가 읽었던 게시물에 대한 통계 데이터를 반환하는 함수
    이때 각 점수는 PostReadingRecord의 read_count만큼 더한 값으로 한다.
    :param reader_id: 대상 페르소나의 ID
    :param record_limit: 통계에 사용할 조회 기록의 최대 갯수
    :param result_limit: 결과로 반환할 데이터의 최대 갯수
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return: {
        "tag_scores": [{'label': Tag.body, 'score': 점수} ...],
        "category_scores": [{'label': Category.body, 'score': 점수} ...],
    }
    """

    # 많이 읽은 순서대로 조회 기록을 가져옴
    records = PostReadingRecord.objects.filter(persona=reader_id, updated_at__gte=start_dt, updated_at__lte=end_dt) \
                  .order_by('-read_count')[:record_limit]

    # 점수 저장 (항목마다 read_count씩 점수 추가)
    tag_scores = defaultdict(int)
    category_scores = defaultdict(int)

    for record in records:
        # 태그 점수 매기기
        tag_bodies = map(lambda t: t.body, record.post.tags.all())
        for body in tag_bodies:
            tag_scores[body] += record.read_count

        # 카테고리 점수 매기기
        category = record.post.category
        category_scores[category.body if category else 'None'] += record.read_count

    # 점수가 높은 상위 태그/카테고리만 반환
    tag_scores = sorted([(k, v) for k, v in tag_scores.items()], key=lambda p: p[1], reverse=True)[:result_limit]
    category_scores = sorted([(k, v) for k, v in category_scores.items()],
                             key=lambda p: p[1], reverse=True)[:result_limit]

    # FieldScore를 kwargs 방식으로 초기화 하기 위해 변환해서 반환
    tag_scores = [{'label': label, 'score': score} for label, score in tag_scores]
    category_scores = [{'label': label, 'score': score} for label, score in category_scores]

    return {
        'tag_scores': tag_scores,
        'category_scores': category_scores,
    }


def get_post_read_counts_by_day(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[datetime.date, int]:
    """
    특정 사용자의 일별 읽은 게시물의 수를 반환하는 함수
    :param reader_id: 조회 대상 페르소나의 id
    :param reader_id: 대상 페르소나의 ID
    :param record_limit: 통계에 사용할 조회 기록의 최대 갯수
    :param result_limit: 결과로 반환할 데이터의 최대 갯수
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return:
    """
    print(start_dt, end_dt)
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')
    updated_dates = list(map(lambda dt: dt['updated_at'].date(), records))
    result = Counter(updated_dates)

    return result