import strawberry

from graphql_app.resolvers.errors import IntegrityError, ResourceNotFoundError


@strawberry.type
class AlreadyJoinedMembershipError(IntegrityError):
    """
    이미 멤버쉽에 가입 되어 있으나 다시 멤버쉽 가입을 요청한 경우 발생
    """
    message: str = '이미 멤버쉽에 가입되어 있습니다.'

    def __init__(self):
        super().__init__()


@strawberry.type
class NotMemberError(ResourceNotFoundError):
    """
    멤버쉽에 가입하지 않았으나 멤버쉽 탈퇴를 요청한 경우 발생
    """
    message: str = '해당 creator에 대한 멤버쉽에 가입하지 않았습니다.'

    def __init__(self):
        super().__init__('Membership')
