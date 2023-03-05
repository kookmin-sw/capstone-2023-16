from typing import Optional

import strawberry
from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers

from graphql_app import models
from graphql_app.types.enums import Gender
from graphql_app.types.errors import AuthInfoRequiredError
from graphql_app.types.model_types import Persona
from graphql_app.types.decorators import requires_auth
from graphql_app.types.persona.errors import PersonaNicknameDuplicatedError


@gql.type
class Mutation:
    @gql.django.input(models.Persona)
    class PersonaCreateInput:
        """
        페르소나 생성에 필요한 정보
        """
        nickname: str = strawberry.field(description='닉네임 (unique)')
        introduction: str = strawberry.field(description='소개')
        is_public: bool = strawberry.field(description='공개 여부')
        gender: Optional[Gender] = strawberry.field(default=None, description='성별')
        age: Optional[int] = strawberry.field(default=None, description='나이')
        job: Optional[str] = strawberry.field(default=None, description='직업')

    @strawberry.mutation
    @requires_auth
    def create_persona(self, info: Info, new_persona_input: PersonaCreateInput) \
            -> strawberry.union("CreatePersonaResult", (Persona,
                                                        AuthInfoRequiredError,
                                                        PersonaNicknameDuplicatedError)):
        """
        새 Persona를 생성한다.
        """
        # nickname 중복 검사
        if models.Persona.objects.filter(nickname=new_persona_input.nickname).exists():
            return PersonaNicknameDuplicatedError(given_nickname=new_persona_input.nickname)

        # TODO : Django Model에서도 Gender를 그대로 사용할 수 있게 수정하고 싶은데..
        if new_persona_input.gender:
            if new_persona_input.gender == Gender.MALE:
                new_persona_input.gender = '남성'
            else:
                new_persona_input.gender = '여성'

        # 요청한 사용자를 페르소나의 소유자로 설정
        new_persona_input.user = info.context.request.user.id
        new_persona = resolvers.create(info, models.Persona, resolvers.parse_input(info, vars(new_persona_input)))

        return new_persona
