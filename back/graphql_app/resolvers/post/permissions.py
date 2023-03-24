import typing

from strawberry import BasePermission
from strawberry.types import Info

from graphql_app.domain.post.core import is_eligible_for_paid_content
from graphql_app.resolvers.errors import CookieContextRequiredError
from graphql_app.resolvers.utils import parse_global_id


class IsEligibleForPaidContent(BasePermission):
    message = "유료 콘텐츠에 대해 권한이 없습니다."

    def has_permission(self, source: typing.Any, info: Info, **kwargs) -> bool:
        post_id = source.id if source else info.variable_values['postId'].node_id

        if 'persona_id' not in info.context.request.COOKIES:
            raise CookieContextRequiredError
        else:
            _, persona_id = parse_global_id(info.context.request.COOKIES['persona_id'])
            return is_eligible_for_paid_content(persona_id, post_id, info.context.request.user.id)
