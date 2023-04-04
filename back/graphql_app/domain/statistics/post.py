from collections import defaultdict, Counter
from datetime import datetime
from typing import Dict, Tuple, List, Optional

from django.db.models import QuerySet

from graphql_app.models import PostReadingRecord, Post, Persona


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
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return:
    """
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')
    updated_dates = list(map(lambda dt: dt['updated_at'].date(), records))
    result = Counter(updated_dates)

    return result


def get_post_read_counts_by_hour(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[int, int]:
    """
    특정 사용자의 시간대별 읽은 게시물의 수를 반환하는 함수
    :param reader_id: 조회 대상 페르소나의 id
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return: {0~24 사이의 시각(hour) : 해당 시각에 읽은 게시물의 수
    """
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')
    updated_dates = list(map(lambda dt: dt['updated_at'].hour, records))
    result = Counter(updated_dates)
    for h in range(0, 24):
        if h not in result.keys():
            result[h] = 0

    return result


def get_post_read_counts_by_weekday(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[int, int]:
    """
    특정 사용자의 요일별 읽은 게시물의 수를 반환하는 함수
    :param reader_id: 조회 대상 페르소나의 id
    :param start_dt: 조회 시작 일시
    :param end_dt: 조회 종료 일시
    :return: {weekday(0은 월요일 ~ 6은 일요일) : 해당 요일에 읽은 게시물의 수}
    """
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt).values('updated_at')
    updated_dates = list(map(lambda dt: dt['updated_at'].weekday(), records))
    result = Counter(updated_dates)
    for h in range(0, 7):
        if h not in result.keys():
            result[h] = 0

    return result


def get_favorite_personas_statistics(reader_id: int, start_dt: datetime, end_dt: datetime) -> Dict[int, int]:
    records = PostReadingRecord.objects.filter(persona=reader_id,
                                               updated_at__gte=start_dt, updated_at__lte=end_dt) \
        .values('post__author_id')
    post_author_ids = list(map(lambda r: r['post__author_id'], records))
    result = Counter(post_author_ids)
    return result


def _get_post_reader_statistics(records: QuerySet[PostReadingRecord], result_limit: int) \
        -> Dict[str, List[Dict[str, int]]]:
    top_preferred_tags = defaultdict(int)
    top_preferred_categories = defaultdict(int)
    top_genders = defaultdict(int)
    top_age_levels = defaultdict(int)
    top_jobs = defaultdict(int)

    for record in records:
        read_count = record['read_count']

        tag = record['persona__preferred_tags__body']
        if tag:
            top_preferred_tags[tag] += read_count

        category = record['persona__preferred_categories__body']
        if category:
            top_preferred_categories[category] += read_count

        gender = record['persona__gender']
        if gender:
            top_genders[gender] += read_count

        age = record['persona__age']
        if age:
            top_age_levels[f"{age // 10 * 10}대"] += read_count

        job = record['persona__job']
        if job:
            top_jobs[job] += read_count

    tag_scores = sorted([(k, v) for k, v in top_preferred_tags.items()],
                        key=lambda p: p[1], reverse=True)[:result_limit]

    category_scores = sorted([(k, v) for k, v in top_preferred_categories.items()],
                             key=lambda p: p[1], reverse=True)[:result_limit]

    gender_scores = sorted([(k, v) for k, v in top_genders.items()],
                           key=lambda p: p[1], reverse=True)[:result_limit]

    age_scores = sorted([(k, v) for k, v in top_age_levels.items()],
                        key=lambda p: p[1], reverse=True)[:result_limit]

    job_scores = sorted([(k, v) for k, v in top_jobs.items()],
                        key=lambda p: p[1], reverse=True)[:result_limit]

    # FieldScore를 kwargs 방식으로 초기화 하기 위해 변환해서 반환
    tag_scores = [{'label': label, 'score': score} for label, score in tag_scores]
    category_scores = [{'label': label, 'score': score} for label, score in category_scores]
    age_scores = [{'label': label, 'score': score} for label, score in age_scores]
    job_scores = [{'label': label, 'score': score} for label, score in job_scores]
    gender_scores = [{'label': label, 'score': score} for label, score in gender_scores]

    return {
        'tag_scores': tag_scores,
        'category_scores': category_scores,
        'age_scores': age_scores,
        'job_scores': job_scores,
        'gender_scores': gender_scores,
    }


def get_post_reader_statistics(post_id: int, result_limit: int) -> Dict[str, List[Dict[str, int]]]:
    records = PostReadingRecord.objects.filter(post_id=post_id).values('persona__preferred_tags__body',
                                                                       'persona__preferred_categories__body',
                                                                       'persona__gender',
                                                                       'persona__age',
                                                                       'persona__job',
                                                                       'read_count',
                                                                       'persona_id')
    return _get_post_reader_statistics(records, result_limit)


def get_post_revisited_reader_statistics(post_id: int, result_limit: int, min_revisit: int) \
        -> Dict[str, List[Dict[str, int]]]:
    records = PostReadingRecord.objects.filter(post_id=post_id).values('persona__preferred_tags__body',
                                                                       'persona__preferred_categories__body',
                                                                       'persona__gender',
                                                                       'persona__age',
                                                                       'persona__job',
                                                                       'read_count',
                                                                       'persona_id').filter(read_count__gte=min_revisit)
    return _get_post_reader_statistics(records, result_limit)


def _get_personas_statistics(personas: QuerySet[Persona], result_limit: int) -> Dict[str, List[Dict[str, int]]]:
    tag_score = defaultdict(int)
    category_score = defaultdict(int)
    gender_score = defaultdict(int)
    age_score = defaultdict(int)
    job_score = defaultdict(int)

    for persona in personas:
        for tag in persona.preferred_tags.all():
            tag_score[tag.body] += 1

        for category in persona.preferred_categories.all():
            category_score[category.body] += 1

        if persona.gender:
            gender_score[persona.gender] += 1

        if persona.age:
            age_score[f"{persona.age // 10 * 10}대"] += 1

        if persona.job:
            job_score[persona.job] += 1

    tag_scores = sorted([(k, v) for k, v in tag_score.items()],
                        key=lambda p: p[1], reverse=True)[:result_limit]

    category_scores = sorted([(k, v) for k, v in category_score.items()],
                             key=lambda p: p[1], reverse=True)[:result_limit]

    gender_scores = sorted([(k, v) for k, v in gender_score.items()],
                           key=lambda p: p[1], reverse=True)[:result_limit]

    age_scores = sorted([(k, v) for k, v in age_score.items()],
                        key=lambda p: p[1], reverse=True)[:result_limit]

    job_scores = sorted([(k, v) for k, v in job_score.items()],
                        key=lambda p: p[1], reverse=True)[:result_limit]

    # FieldScore를 kwargs 방식으로 초기화 하기 위해 변환해서 반환
    tag_scores = [{'label': label, 'score': score} for label, score in tag_scores]
    category_scores = [{'label': label, 'score': score} for label, score in category_scores]
    age_scores = [{'label': label, 'score': score} for label, score in age_scores]
    job_scores = [{'label': label, 'score': score} for label, score in job_scores]
    gender_scores = [{'label': label, 'score': score} for label, score in gender_scores]

    return {
        'tag_scores': tag_scores,
        'category_scores': category_scores,
        'age_scores': age_scores,
        'job_scores': job_scores,
        'gender_scores': gender_scores,
    }


def get_following_personas_statistics(persona_id: int, result_limit: int) -> Dict[str, List[Dict[str, int]]]:
    following_personas = Persona.objects.filter(following_personas__in=[persona_id])
    return _get_personas_statistics(following_personas, result_limit)


def get_follower_personas_statistics(persona_id: int, result_limit: int) -> Dict[str, List[Dict[str, int]]]:
    follower_personas = Persona.objects.filter(follower_personas__in=[persona_id])
    return _get_personas_statistics(follower_personas, result_limit)
