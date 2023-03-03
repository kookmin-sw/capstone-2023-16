from typing import Dict, Any, Optional

import strawberry
from graphql import GraphQLError

AdditionalInfo = Dict[str, Any]


class ExceptionWithAdditionalInfo(GraphQLError):
    message: str
    additional_info: Optional[Dict[str, Any]]

    def __init__(self):
        super().__init__(self.message)


@strawberry.type
class AuthInfoRequiredError(ExceptionWithAdditionalInfo):
    """
    Authentication에 필요한 정보가 전달되지 않았을 때 발생하는 에러
    """
    message: str = '인증 정보가 필요합니다.'

    def __init__(self):
        super().__init__()


@strawberry.type
class AdminPermissionRequiredError(ExceptionWithAdditionalInfo):
    """
    요청된 작업에 admin 권한이 필요하나, 권한을 가지고 있지 않은 경우
    """
    message: str = 'Admin 권한이 필요한 서비스입니다.'

    def __init__(self):
        super().__init__()


@strawberry.type
class AnonymousOnlyError(ExceptionWithAdditionalInfo):
    """
    로그인한 사용자는 접근할 수 없는 서비스에 접근한 경우
    """
    message: str = '로그인한 사용자는 접근할 수 없는 서비스입니다.'

    def __init__(self):
        super().__init__()


@strawberry.type
class DuplicatedValueError(ExceptionWithAdditionalInfo):
    """
    중복이 허용되지 않은 필드에 중복된 값이 전달된 경우 발생하는 에러
    """
    message = '중복이 허용되지 않는 필드입니다.'
    violated_field_name: str = strawberry.field(description='중복 필드 이름')
    violated_field_value: str = strawberry.field(description='중복 필드 값')

    def __init__(self, field_name: str, field_value: str):
        super().__init__()
        self.additional_info = {
            'violatedFieldName': field_name,
            'violatedFieldValue': field_value,
        }
