import strawberry

from graphql_app.types.errors import GraphQLError


# 로그인 관련 에러 =====================================================
@strawberry.interface
class LoginError(GraphQLError):
    """
    로그인 관련 에러
    """
    pass


@strawberry.type
class WrongCertInfoError(LoginError):
    """
    잘못된 인증 정보(email, password 등)이 전달 되어 로그인에 실패한 경우 (코드 1)
    """
    message: str = 'Wrong certification info.'
    code: int = 1


# 회원 가입 관련 에러 ==================================================
@strawberry.interface
class RegisterError(GraphQLError):
    """
    회원 가입 관련 에러
    """
    pass


@strawberry.type
class UsernameAlreadyUsedError(RegisterError):
    """
    이미 사용 중인 username으로 회원 가입을 시도하려는 경우 (코드 1)
    """
    message: str = 'Given username is already used.'
    code: int = 1
