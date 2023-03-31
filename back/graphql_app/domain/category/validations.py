from typing import Tuple

from graphql_app.models import Category


def check_body_length(body: str) -> Tuple[int, int]:
    """
    Category body의 길이 유효성을 검증하는 함수
    (num1, num2)의 형태로 반환한다.
    1. 최소 길이보다 짧은 경우 : (-1, 요구되는 body의 최소 길이)
    2. 최대 길이보다 긴 경우 : (+1, 요구되는 body의 최대 길이)
    3. 유효 : (0, 0)
    """
    if len(body) < Category.MIN_CATEGORY_BODY_LEN:
        return -1, Category.MIN_CATEGORY_BODY_LEN
    elif len(body) > Category.MAX_CATEGORY_BODY_LEN:
        return 1, Category.MAX_CATEGORY_BODY_LEN
    else:
        return 0, 0
