from datetime import datetime, timedelta
from typing import Dict, List

from graphql_app.domain.statistics.core import get_counts_by, get_statistics_from_records
from graphql_app.models import PostReadingRecord


def get_post_read_counts_by_day(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[datetime.date, int]:
    """
    특정 사용자의 일별 읽은 게시물의 수를 반환하는 함수
    :param reader_id: 조회 대상 페르소나의 id
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return:
    """
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')

    label_resolver = lambda dt: str(dt['updated_at'].date())

    label_pool = []
    current_dt = start_dt.date()
    while current_dt < end_dt.date():
        label_pool.append(str(current_dt))
        current_dt += timedelta(days=1)

    statistics = get_counts_by(records, label_resolver, label_pool)

    return statistics


def get_post_read_counts_by_hour(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[str, int]:
    """
    특정 사용자의 시간대별 읽은 게시물의 수를 반환하는 함수
    :param reader_id: 조회 대상 페르소나의 id
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return: {0~24 사이의 시각(hour) : 해당 시각에 읽은 게시물의 수
    """
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')

    label_resolver = lambda dt: str(dt['updated_at'].hour)
    label_pool = list(map(str, range(0, 24)))

    statistics = get_counts_by(records, label_resolver, label_pool)
    return statistics


def get_post_read_counts_by_weekday(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[str, int]:
    """
    특정 사용자의 요일별 읽은 게시물의 수를 반환하는 함수
    :param reader_id: 조회 대상 페르소나의 id
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return: {weekday(0은 월요일 ~ 6은 일요일) : 해당 요일에 읽은 게시물의 수}
    """
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')

    label_resolver = lambda dt: '월화수목금토일'[dt['updated_at'].weekday()]
    label_pool = list('월화수목금토일')

    statistics = get_counts_by(records, label_resolver, label_pool)
    return statistics


def get_post_read_counts_by_author(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[int, int]:
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt) \
        .values('post__author_id')
    label_resolver = lambda r: r['post__author_id']

    statistics = get_counts_by(records, label_resolver, [])

    return statistics


def get_post_reader_statistics(post_id: int, min_revisit: int, result_limit: int) \
        -> Dict[str, List[Dict[str, int]]]:
    records = PostReadingRecord.objects.filter(post_id=post_id, read_count__gte=min_revisit) \
        .values('read_count',
                'persona_id',
                'post_id',
                'persona__gender',
                'persona__age',
                'persona__job',
                'persona__preferred_tags__body',
                'persona__preferred_categories__body')

    pp_resolver = lambda x: (x['persona_id'], x['post_id'])

    io_labels = {
        'persona__gender': 'gender_scores',
        'persona__age': 'age_scores',
        'persona__job': 'job_scores',
        'persona__preferred_tags__body': 'tag_scores',
        'persona__preferred_categories__body': 'category_scores',
    }

    input_resolvers = {
        'persona__age': lambda age: f"{age // 10 * 10}대"
    }

    statistics = get_statistics_from_records(records, pp_resolver, result_limit, io_labels, input_resolvers)
    return statistics


def get_read_post_statistics(reader_id: int, result_limit: int, start_dt: datetime, end_dt: datetime) \
        -> Dict[str, Dict[str, int]]:
    records = PostReadingRecord.objects.filter(persona=reader_id, updated_at__gte=start_dt, updated_at__lte=end_dt) \
        .order_by('-read_count') \
        .values('read_count', 'persona_id', 'post_id',
                'post__tags__body', 'post__category__body',
                'post__author__preferred_tags__body', 'post__author__preferred_categories__body',
                'post__author__gender', 'post__author__age', 'post__author__job')

    pp_resolver = lambda x: (x['persona_id'], x['post_id'])

    io_labels = {
        'post__tags__body': 'tag_scores',
        'post__category__body': 'category_scores',
        'post__author__preferred_tags__body': 'author_tag_scores',
        'post__author__preferred_categories__body': 'author_category_scores',
        'post__author__gender': 'author_gender_scores',
        'post__author__age': 'author_age_scores',
        'post__author__job': 'author_job_scores',
    }

    input_resolvers = {
        'post__author__age': lambda age: f"{age // 10 * 10}대"
    }

    statistics = get_statistics_from_records(records, pp_resolver, result_limit, io_labels, input_resolvers)
    author_keys = set(filter(lambda x: x.startswith('author_'), statistics.keys()))
    statistics['author_statistics'] = dict()

    for label in author_keys:
        if label.startswith('author_'):
            statistics['author_statistics'][label[7:]] = statistics[label]
            del statistics[label]
    return statistics
