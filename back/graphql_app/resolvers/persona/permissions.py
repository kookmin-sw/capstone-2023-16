from typing import Any

from strawberry import BasePermission
from strawberry.types import Info

from graphql_app.models import Persona
from graphql_app.resolvers.utils import parse_global_id


class PersonaContextPermission(BasePermission):
    message = "Persona context가 필요합니다."

    def has_permission(self, source: Any, info: Info, **kwargs) -> bool:
        if 'persona_id' in info.context.request.COOKIES.keys():
            persona_id = info.context.request.COOKIES.get('persona_id')
        elif 'persona_id' in info.context.request.headers.keys():
            persona_id = info.context.request.headers.get('persona_id')
        else:
            return False

        _, persona_id = parse_global_id(persona_id)
        persona = Persona.objects.get(id=persona_id)
        if persona.owner != info.context.request.user:
            return False

        info.context.request.persona = persona
        return True


class PersonaOwnershipPermission(PersonaContextPermission):
    message = '페르소나 본인만 접근할 수 있습니다.'

    def has_permission(self, source: Any, info: Info, **kwargs) -> bool:
        if not super().has_permission(source, info, **kwargs):
            return False
        else:
            return True
