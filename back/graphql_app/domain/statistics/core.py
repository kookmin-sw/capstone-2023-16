from collections import defaultdict, Counter
from typing import Callable, Dict, List

from django.db import models
from django.db.models import QuerySet

from graphql_app.models import PostReadingRecord


def get_counts_by(records: QuerySet[models.Model], label_resolver: Callable, label_pool: List[str]) \
        -> Dict[str, int]:
    labels = list(map(lambda dt: label_resolver(dt), records))
    result = Counter(labels)
    for label in label_pool:
        if label not in result.keys():
            result[label] = 0

    return result


def get_statistics_from_records(records: QuerySet[PostReadingRecord], pp_resolver: Callable, result_limit: int,
                                io_label: Dict[str, str], input_resolvers: Dict[str, Callable] = dict(),

                                score_by_read_count: bool = True) -> Dict[str, List[Dict[str, int]]]:
    # Tag와 Category가 중복해서 전달되는 문제를 해결
    # (__body로 끝나는 필드가 아닌 다른 필드가 이미 처리된 경우 tag와 category만 집계)
    pp_set = set(map(lambda x: pp_resolver(x), records))

    # input field별 점수
    score_by_fields = {input_label: defaultdict(int) for input_label in io_label.keys()}
    for record in records:
        pp = pp_resolver(record)
        # 이미 처리된 경우 '__body'로 끝나는 필드만 처리
        if not pp in pp_set:
            only__body = True
        # 아직 처리되지 않은 경우 모두 처리
        else:
            pp_set.remove(pp)
            only__body = False

        # 점수를 조회수만큼 올리는 경우 read_count씩, 그렇지 않은 경우 1씩 올림
        scoring = record['read_count'] if score_by_read_count else 1

        # 통계 대상이 되는 필드에 대해
        for input_label in io_label.keys():
            # tag와 body
            if only__body and not input_label.endswith('__body'):
                continue
            # 만약 해당 필드의 값이 None이 아니라면,
            value = record[input_label]
            if value is not None:
                # resolver가 명시된 경우 해당 resolver의 결과를 label로 점수를 올림
                if input_label in input_resolvers.keys():
                    resolver = input_resolvers[input_label]
                    score_by_fields[input_label][resolver(value)] += scoring
                # 그렇지 않은 경우 그대로 점수를 올림
                else:
                    score_by_fields[input_label][value] += scoring

    # 결과를 점수가 높은 순서대로 정렬하여 반환 형식에 맞게 변환
    statistics = dict()
    # 각각의 통계 대상 필드에 대해
    for input_label in io_label.keys():
        score_by_field = score_by_fields[input_label]
        # 점수가 높은 순서대로 최대 result_limit개까지 반환
        statistics_pair = sorted([(k, v) for k, v in score_by_field.items()],
                                 key=lambda p: p[1], reverse=True)[:result_limit]
        # input_label에 대응되는 output_label로 반환
        output_label = io_label[input_label]
        # 단, FieldScore를 kwargs 방식으로 초기화 하기 위해 변환해서 반환
        statistics[output_label] = [{'label': label, 'score': score} for label, score in statistics_pair]

    return statistics
