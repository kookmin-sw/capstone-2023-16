from typing import Iterable, cast

from strawberry.types import Info
from strawberry_django_plus import gql

from graphql_app.types.decorators import requires_auth
from graphql_app.types.model_types import Persona
from graphql_app.models import Persona as PersonaModel


@gql.type
class Query:
    @gql.django.connection
    @requires_auth
    def get_own_persona_connection(self, info: Info) -> Iterable[Persona]:
        """
        로그인한 사용자의 페르소나 목록
        """
        requested_user = info.context.request.user
        return cast(Iterable[Persona], PersonaModel.objects.filter(user=requested_user))
