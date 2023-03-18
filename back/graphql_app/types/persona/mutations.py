from typing import Optional, List

import strawberry
from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.mutations import resolvers
from strawberry_django_plus.relay import GlobalID

from graphql_app import models
from graphql_app.types.enums import Gender
from graphql_app.types.errors import AuthInfoRequiredError, PermissionDeniedError
from graphql_app.types.model_types import Persona
from graphql_app.types.decorators import requires_auth
from graphql_app.types.persona.enums import Job
from graphql_app.types.persona.errors import PersonaNicknameDuplicatedError, SelfFollowError


@gql.type
class Mutation:
    @gql.django.input(models.Persona)
    class PersonaCreateInput:
        """
        페르소나 생성에 필요한 정보
        """

        @gql.django.input(models.Category)
        class CategoryIDInput:
            id: gql.auto = strawberry.field(description='카테고리 ID')

        nickname: str = strawberry.field(description='닉네임 (unique)')
        introduction: Optional[str] = strawberry.field(default='자기소개가 없습니다.', description='소개')
        is_public: Optional[bool] = strawberry.field(default=True, description='공개 여부')
        gender: Optional[Gender] = strawberry.field(default=None, description='성별')
        age: Optional[int] = strawberry.field(default=None, description='나이')
        job: Optional[Job] = strawberry.field(default=None, description='직업')
        preferred_tag_bodies: Optional[List[str]] = strawberry.field(default_factory=list,
                                                                     description='선호하는 태그의 body 목록 (insert 됨)')
        preferred_categories: Optional[List[CategoryIDInput]] = strawberry.field(default_factory=list,
                                                                                 description='선호 카테고리 목록')

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

        # nickname 중복 검사
        if models.Persona.objects.filter(nickname=new_persona_input['nickname']).exists():
            return PersonaNicknameDuplicatedError(given_nickname=new_persona_input['nickname'])

        # TODO : Django Model에서도 Gender를 그대로 사용할 수 있게 수정하고 싶은데..
        if new_persona_input['gender']:
            if new_persona_input['gender'] == Gender.MALE:
                new_persona_input['gender'] = '남성'
            else:
                new_persona_input['gender'] = '여성'

        if new_persona_input['job']:
            new_persona_input['job'] = new_persona_input['job'].value

        # 카테고리 처리 (id를 넘겨 주어야 함)
        new_persona_input['preferred_categories'] = list(map(lambda c: c['id'].id,
                                                             new_persona_input['preferred_categories']))

        # 요청한 사용자를 페르소나의 소유자로 설정
        new_persona_input['owner'] = info.context.request.user
        new_persona = resolvers.create(
            info, models.Persona, resolvers.parse_input(info, new_persona_input))

        # 선호 태그 연결 처리
        tags = list(map(lambda pair: pair[0], models.Tag.insert_tags(new_persona_input['preferred_tag_bodies'])))
        new_persona.preferred_tags.add(*tags)

        return new_persona

    @gql.django.input(models.Persona)
    class PersonaFollowToggleInput:
        """
        페르소나 팔로우/언팔로우 토글에 필요한 정보
        """
        followee_persona: GlobalID = strawberry.field(description='팔로우/언팔로우의 대상이 되는 페르소나의 ID')
        follower_persona: GlobalID = strawberry.field(description='팔로우/언팔로우를 수행하는 페르소나의 ID (본인 페르소나)')

    @strawberry.type
    class PersonaFollowToggleOutput:
        """
        페르소나 팔로우/언팔로우 토글 결과
        """
        followee_persona: GlobalID = strawberry.field(description='팔로우/언팔로우 토글을 수행한 페르소나의 ID')
        followed: bool = strawberry.field(description='작업 수행 후 팔로우 여부')

    @strawberry.mutation
    @requires_auth
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
        follower_persona: models.Persona = parsed_input['follower_persona']
        followee_persona: models.Persona = parsed_input['followee_persona']

        # 팔로우 토글을 요청한 유저가 페르소나의 소유주가 아닌 경우
        if follower_persona.owner != requested_user:
            raise PermissionDeniedError('requested_user == follower_persona.owner')
        # 팔로잉 대상이 되는 페르소나와 팔로우 대상이 되는 페르소나와 같은 경우
        elif followee_persona == follower_persona:
            raise SelfFollowError()
        # 정상 처리
        else:
            # 팔로우 상태가 아닌 경우 팔로우 상태로 전환
            if followee_persona not in follower_persona.following_personas.all():
                follower_persona.following_personas.add(followee_persona)
                follower_persona.save()
                followed = True
            # 팔로우 상태인 경우 언팔로우
            else:
                follower_persona.following_personas.remove(followee_persona)
                follower_persona.save()
                followed = False

            return Mutation.PersonaFollowToggleOutput(followee_persona=followee_persona.id,
                                                      followed=followed)
