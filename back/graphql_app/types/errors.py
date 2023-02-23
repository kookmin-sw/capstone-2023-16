import strawberry


@strawberry.interface
class GraphQLError:
    """
    GraphQL 관련 최상위 에러
    """
    message: str = strawberry.field(description='에러 메시지')
    code: int = strawberry.field(description='에러 상세 코드')


@strawberry.interface
class QueryError(GraphQLError):
    """
    GraphQL Query 요청 처리 중 발생 하는 에러
    """
    pass


@strawberry.interface
class MutationError(GraphQLError):
    """
    GraphQL Mutation 요청 처리 중 발생 하는 에러
    """
    pass
