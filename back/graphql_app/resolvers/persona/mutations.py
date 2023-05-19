import strawberry
from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers

from graphql_app import models
from graphql_app.domain.persona.core import create_persona, persona_follow_toggle, update_persona
from graphql_app.domain.persona.exceptions import NicknameDupliationException, SelfFollowException, PersonaNotFoundException
from graphql_app.resolvers.decorators import requires_auth, requires_persona_context
from graphql_app.resolvers.errors import AuthInfoRequiredError, PermissionDeniedError
from graphql_app.resolvers.model_types import Persona
from graphql_app.resolvers.persona.errors import PersonaNicknameDuplicatedError, SelfFollowError
from graphql_app.resolvers.persona.types import PersonaCreateInput, PersonaUpdateInput, PersonaFollowToggleOutput, PersonaFollowToggleInput
from graphql_app.resolvers.utils import parse_global_ids

from graphql_app.resolvers.utils import parse_global_id


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
        birth_year = new_persona_input['birth_year']
        preferred_tag_bodies = new_persona_input['preferred_tag_bodies']
        preferred_categories = new_persona_input['preferred_categories']
        preferred_category_ids = list(map(lambda x: x['id'].id, preferred_categories))

        try:
            new_persona = create_persona(owner, nickname, introduction, is_public, gender, birth_year, job,
                                         preferred_tag_bodies, preferred_category_ids)
        except NicknameDupliationException:
            raise PersonaNicknameDuplicatedError(given_nickname=new_persona_input['nickname'])
        else:
            return new_persona


    @strawberry.mutation
    @requires_auth
    def persona_update(self, info: Info, update_persona_input: PersonaUpdateInput) \
            -> strawberry.union("UpdatePersonaResult", (Persona,
                                                        AuthInfoRequiredError,
                                                        PersonaNicknameDuplicatedError)):
        _, persona_id = parse_global_id(str(update_persona_input.persona_id))
        update_persona_input = resolvers.parse_input(info, update_persona_input)
        owner = info.context.request.user
        nickname = update_persona_input['nickname']
        introduction = update_persona_input['introduction']
        is_public = update_persona_input['is_public']
        gender = update_persona_input['gender']
        job = update_persona_input['job']
        age = update_persona_input['age']
        preferred_tag_bodies = update_persona_input['preferred_tag_bodies']
        preferred_categories = update_persona_input['preferred_categories']
        _, preferred_category_ids = parse_global_ids(preferred_categories)

        try:
            updated_persona = update_persona(persona_id, owner, nickname, introduction, is_public, gender, age, job,
                                             preferred_tag_bodies, preferred_category_ids)
        except Persona.DoesNotExist:
            raise PersonaNotFoundException(given_persona_id=persona_id)
        except NicknameDupliationException:
            raise PersonaNicknameDuplicatedError(given_nickname=update_persona_input['nickname'])
        else:
            return updated_persona

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
