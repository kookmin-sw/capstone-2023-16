import strawberry


@strawberry.interface
class Error:
    """
    GraphQL 관련 최상위 에러
    """
    message: str = strawberry.field(description='에러 메시지')
    code: int = strawberry.field(description='에러 상세 코드')
