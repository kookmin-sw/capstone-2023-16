import strawberry

from graphql_app.resolvers.errors import ExceptionWithAdditionalInfo, DuplicatedValueError


# 로그인 관련 에러 =====================================================
@strawberry.type
class WrongCertInfoError(ExceptionWithAdditionalInfo):
    """
    잘못된 인증 정보(email, password 등)이 전달 되어 로그인에 실패한 경우
    """
    message: str = '잘못된 인증 정보입니다.'

    def __init__(self):
        super().__init__()


# 회원 가입 관련 에러 ==================================================
@strawberry.type
class UsernameAlreadyUsedError(DuplicatedValueError):
    """
    이미 사용 중인 username으로 User에 대한 생성/수정을 시도하려는 경우
    """
    message: str = '해당 username은 이미 사용 중입니다.'
    violated_field_name: str = 'username'
    violated_field_value: str = strawberry.field(description='중복된 username 값')

    def __init__(self, given_username: str):
        super().__init__('username', given_username)


@strawberry.type
class EmailAlreadyUsedError(DuplicatedValueError):
    """
    이미 사용 중인 email로 생성/수정을 시도하려는 경우
    """
    message: str = '해당 email은 이미 사용 중입니다.'
    violated_field_value: str = strawberry.field(description='중복된 email 값')

    def __init__(self, given_email: str):
        super().__init__('email', given_email)
