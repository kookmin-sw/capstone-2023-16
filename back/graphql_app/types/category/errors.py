import strawberry

from graphql_app.types.errors import DuplicatedValueError, StaticValidationError


@strawberry.type
class CategoryBodyDuplicatedError(DuplicatedValueError):
    """
    이미 등록된 body로 카테고리 생성을 시도한 경우 발생
    """
    message: str = '이미 사용중인 body입니다.'
    violated_field_value: str = strawberry.field(description='중복된 카테고리 body 값')

    def __init__(self, given_body: str):
        super().__init__('body', given_body)


@strawberry.type
class CategoryBodyTooShortError(StaticValidationError):
    """
    카테고리 body의 길이가 기준치보다 짧은 경우 발생
    """
    message: str = '카테고리 이름의 길이가 너무 짧습니다.'
    violated_field_value: str = strawberry.field(description='전달된 카테고리 body 값')

    def __init__(self, given_tag_body: str, minimum_length: int):
        detail_message = f"전달된 문자 길이: {len(given_tag_body)} / 최소 길이: {minimum_length}"
        super().__init__('body', given_tag_body, detail_message)


@strawberry.type
class CategoryBodyTooLongError(StaticValidationError):
    """
    카테고리 body의 길이가 기준치보다 긴 경우 발생
    """
    message: str = '카테고리 이름의 길이가 너무 깁니다.'
    violated_field_value: str = strawberry.field(description='전달된 카테고리 body 값')

    def __init__(self, given_tag_body: str, maximum_length: int):
        detail_message = f"전달된 문자 길이: {len(given_tag_body)} / 최대 길이: {maximum_length}"
        super().__init__('body', given_tag_body, detail_message)
