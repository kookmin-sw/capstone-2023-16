from typing import Tuple

from graphql_app.models import Tag


def check_body_length(body: str) -> Tuple[int, int]:
    """
    Tag body의 길이 유효성을 검증하는 함수
    (num1, num2)의 형태로 반환한다.
    1. 최소 길이보다 짧은 경우 : (-1, 요구되는 body의 최소 길이)
    2. 최대 길이보다 긴 경우 : (+1, 요구되는 body의 최대 길이)
    3. 유효 : (0, 0)
    """
    if len(body) > Tag.MAX_TAG_BODY_LEN:
        return 1, Tag.MAX_TAG_BODY_LEN
    elif len(body) < Tag.MIN_TAG_BODY_LEN:
        return -1, Tag.MIN_TAG_BODY_LEN
    else:
        return 0, 0
