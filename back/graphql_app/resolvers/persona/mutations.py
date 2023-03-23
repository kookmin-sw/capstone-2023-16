import strawberry
from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers

from graphql_app import models
from graphql_app.domain.persona.core import create_persona, persona_follow_toggle
from graphql_app.domain.persona.exceptions import NicknameDupliationException, SelfFollowException
from graphql_app.resolvers.errors import AuthInfoRequiredError, PermissionDeniedError
from graphql_app.resolvers.model_types import Persona
from graphql_app.resolvers.decorators import requires_auth, requires_persona_context
from graphql_app.resolvers.persona.errors import PersonaNicknameDuplicatedError, SelfFollowError
from graphql_app.resolvers.persona.types import PersonaCreateInput, PersonaFollowToggleOutput, PersonaFollowToggleInput
from graphql_app.resolvers.utils import parse_global_ids


@gql.type
class Mutation:
    @strawberry.mutation
    @requires_auth
    def persona_create(self, info: Info, new_persona_input: PersonaCreateInput) \
            -> strawberry.union("CreatePersonaResult", (Persona,
                                                        AuthInfoRequiredError,
                                                        PersonaNicknameDuplicatedError)):
        """
        새 Persona를 생성한다.
        """
        new_persona_input = resolvers.parse_input(info, new_persona_input)
        owner = info.context.request.user
        nickname = new_persona_input['nickname']
        introduction = new_persona_input['introduction']
        is_public = new_persona_input['is_public']
        gender = new_persona_input['gender']
        job = new_persona_input['job']
        age = new_persona_input['age']
        preferred_tag_bodies = new_persona_input['preferred_tag_bodies']
        preferred_categories = new_persona_input['preferred_categories']
        _, preferred_category_ids = parse_global_ids(preferred_categories)

        try:
            new_persona = create_persona(owner, nickname, introduction, is_public, gender, age, job,
                                         preferred_tag_bodies, preferred_category_ids)
        except NicknameDupliationException:
            raise PersonaNicknameDuplicatedError(given_nickname=new_persona_input['nickname'])
        else:
            return new_persona

    @strawberry.mutation
    @requires_persona_context
    def persona_follow_toggle(self, info: Info, persona_follow_input: PersonaFollowToggleInput) \
            -> strawberry.union('PersonaFollowToggleResult', (PersonaFollowToggleOutput,
                                                              AuthInfoRequiredError,
                                                              PermissionDeniedError,
                                                              SelfFollowError)):
        """
        특정 페르소나에 대한 팔로우/언팔로우 토글을 수행한다.
        """
        requested_user: models.User = info.context.request.user

        parsed_input = resolvers.parse_input(info, persona_follow_input)
        follower_persona: models.Persona = info.context.request.persona
        followee_persona: models.Persona = parsed_input['followee_persona']

        try:
            followed = persona_follow_toggle(requested_user, follower_persona, followee_persona)
        except SelfFollowException:
            raise SelfFollowError
        else:
            return PersonaFollowToggleOutput(followee_persona=followee_persona.id, followed=followed)
