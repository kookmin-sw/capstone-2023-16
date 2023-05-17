import typing

from strawberry import BasePermission
from strawberry.types import Info

from graphql_app.domain.post.core import is_eligible_for_paid_content, has_required_tier
from graphql_app.models import Persona
from graphql_app.resolvers.errors import PersonaContextRequiredError
from graphql_app.resolvers.utils import parse_global_id


class IsEligibleForPaidContent(BasePermission):
    message = "유료 콘텐츠에 대해 권한이 없습니다."

    def has_permission(self, source: typing.Any, info: Info, **kwargs) -> bool:
        post_id = source.id if source else info.variable_values['postId'].node_id

        if 'persona_id' in info.context.request.COOKIES.keys():
            persona_id = info.context.request.COOKIES.get('persona_id')
        elif 'persona_id' in info.context.request.headers.keys():
            persona_id = info.context.request.headers.get('persona_id')
        else:
            raise PersonaContextRequiredError('persona_id')

        _, persona_id = parse_global_id(persona_id)
        return is_eligible_for_paid_content(persona_id, post_id, info.context.request.user.id)


class MembershipTierPermission(BasePermission):
    message = '요구되는 멤버쉽 티어 조건을 만족하지 않습니다.'

    def has_permission(self, source: typing.Any, info: Info, **kwargs) -> bool:
        if 'persona_id' in info.context.request.COOKIES.keys():
            persona_id = info.context.request.COOKIES.get('persona_id')
        elif 'persona_id' in info.context.request.headers.keys():
            persona_id = info.context.request.headers.get('persona_id')
        else:
            raise PersonaContextRequiredError('persona_id')

        _, persona_id = parse_global_id(persona_id)
        try:
            persona = Persona.objects.get(owner=info.context.request.user, id=persona_id)
        except Persona.DoesNotExist:
            return has_required_tier(persona_id, source)
        else:
            return persona.id == source.author.id


class OwnerOnlyPermission(BasePermission):
    message = "페르소나의 소유자만 확인할 수 있습니다."

    def has_permission(self, source: typing.Any, info: Info, **kwargs) -> bool:
        pass
