import strawberry

from graphql_app.types.errors import StaticValidationError


@strawberry.type
class TagBodyTooShortError(StaticValidationError):
    """
    태그 body의 길이가 기준치보다 짧은 경우 발생
    """
    message: str = '태그의 길이가 너무 짧습니다.'
    violated_field_value: str = strawberry.field(description='전달된 태그 body 값')

    def __init__(self, given_tag_body: str, minimum_length: int):
        detail_message = f"전달된 문자 길이: {len(given_tag_body)} / 최소 길이: {minimum_length}"
        super().__init__('body', given_tag_body, detail_message)


@strawberry.type
class TagBodyTooLongError(StaticValidationError):
    """
    태그 body의 길이가 기준치보다 긴 경우 발생
    """
    message: str = '태그의 길이가 너무 깁니다.'
    violated_field_value: str = strawberry.field(description='전달된 태그 body 값')

    def __init__(self, given_tag_body: str, maximum_length: int):
        detail_message = f"전달된 문자 길이: {len(given_tag_body)} / 최대 길이: {maximum_length}"
        super().__init__('body', given_tag_body, detail_message)
