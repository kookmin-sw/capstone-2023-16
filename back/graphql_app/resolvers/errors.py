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
class CookieContextRequiredError(ExceptionWithAdditionalInfo):
    """
    Cookie를 통해 필요한 context를 얻을 수 없는 경우 발생
    """
    message: str = 'Cookie로부터 필요한 context를 파싱하는데 실패했습니다.'
    requried_key: str = strawberry.field(description='요구되는 Cookie의 key value')

    def __init__(self, required_key: str, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.requried_key = required_key


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


@strawberry.type
class StaticValidationError(ExceptionWithAdditionalInfo):
    """
    특정 필드에 대한 validation에 실패했을 때 발생하는 에러
    단, 미리 정해진 규칙(글자 수 등)에 위반되는 입력에 대해서만 발생한다.
    """
    message = '필드값 검증에 실패했습니다.'
    violated_field_name: str = strawberry.field(description='위반 필드 이름')
    violated_field_name: str = strawberry.field(description='위반 필드 값')
    detail: Optional[str] = strawberry.field(description='위반 사유 상세')

    def __init__(self, field_name: str, field_value: str, detail: Optional[str] = None):
        super().__init__()
        self.additional_info = {
            'violatedFieldName': field_name,
            'violatedFieldValue': field_value,
            'detail': detail
        }


@strawberry.type
class ResourceNotFoundError(ExceptionWithAdditionalInfo):
    """
    요청된 자원을 검색하는데 실패한 경우 발생하는 에러
    """
    message = '요청된 자원을 찾을 수 없습니다.'
    resource_name: str = strawberry.field(description='요청한 자원의 종류')

    def __init__(self, resource_name: str):
        super().__init__()
        self.additional_info = {
            'resourceName': resource_name
        }


@strawberry.type
class IntegrityError(ExceptionWithAdditionalInfo):
    """
    논리적인 모순이 발생한 경우 발생하는 에러
    """
    message = '요청된 작업을 수행할 수 없습니다.'

    def __init__(self):
        super().__init__()


@strawberry.type
class PermissionDeniedError(ExceptionWithAdditionalInfo):
    """
    요청된 작업에 대한 권한이 없을 경우 발생하는 에러
    """
    message = '요청된 작업에 대한 권한이 없습니다.'
    required_permission: str = strawberry.field(description='요구 권한')

    def __init__(self, required_permission: str):
        super().__init__()
        self.additional_info = {
            'requiredPermission': required_permission
        }
