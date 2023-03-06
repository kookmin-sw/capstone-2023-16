import strawberry

from graphql_app.types.errors import DuplicatedValueError


@strawberry.type
class PersonaNicknameDuplicatedError(DuplicatedValueError):
    """
    이미 사용중인 nickname으로 페르소나 생성/갱신을 시도한 경우 발생
    """
    message: str = '이미 사용중인 nickname입니다.'
    violated_field_value: str = strawberry.field(description='중복된 페르소나 닉네임 값')

    def __init__(self, given_nickname: str):
        super(PersonaNicknameDuplicatedError, self).__init__(
            'nickname', given_nickname)
