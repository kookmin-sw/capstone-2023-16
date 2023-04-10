from datetime import datetime
from typing import Optional

import strawberry
from strawberry import auto
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from graphql_app import models
from graphql_app.domain.membership.enums import Tier
from graphql_app.resolvers.persona.enums import Gender
from graphql_app.resolvers.post.permissions import IsEligibleForPaidContent, MembershipTierPermission


@gql.django.type(models.Category)
class Category(relay.Node):
    """
    Post가 소속되거나, Persona의 선호 대상이 되는 카테고리
    - Post : Category = N : 1
    - Persona : Category = N : M
    """
    body: str = strawberry.field(description='카테고리 본문')
    created_at: datetime = strawberry.field(description='생성 일시')


@gql.django.type(models.Tag)
class Tag(relay.Node):
    """
    Post를 설명하거나, Persona의 선호 대상이 되는 태그
    - Post : Tag = N : M
    - Persona : Tag = N : M
    """
    body: str = strawberry.field(description='태그 본문')
    created_at: datetime = strawberry.field(description='생성 일시')


@gql.django.type(models.User)
class User(relay.Node):
    username: auto = strawberry.field(description='사용자 ID (Unique)')
    email: auto = strawberry.field(description='사용자 E-mail (Unique)')
    signup_method: auto = strawberry.field(description='로그인 방법')

    created_at: auto = strawberry.field(description='생성 시각')
    updated_at: auto = strawberry.field(description='갱신 시각')

    @classmethod
    def get_user_with_info(cls, info: Info) -> 'User':
        return models.User.objects.get(id=info.context.request.user.id)


@gql.django.type(models.Post)
class Post(relay.Node):
    title: str = strawberry.field(description='글 제목')
    content: str = strawberry.field(description='글 내용', permission_classes=[MembershipTierPermission])
    content_preview: Optional[str] = strawberry.field(description='글 내용 미리보기')
    paid_content: Optional[str] = strawberry.field(description='유료 내용', permission_classes=[IsEligibleForPaidContent])
    author: 'Persona' = strawberry.field(description='작성자')
    is_public: bool = strawberry.field(description='공개 여부')
    tags: relay.Connection[Tag] = strawberry.field(description='태그 목록')
    category: Optional[Category] = strawberry.field(description='소속 카테고리')
    required_membership_tier: Optional[Tier] = strawberry.field(description='조회 요구 티어')
    created_at: datetime = strawberry.field(description='생성 시각')
    updated_at: datetime = strawberry.field(description='갱신 시각')


@gql.django.type(models.Membership)
class Membership(relay.Node):
    """
    구독자-창작자 멤버쉽
    - 구독자 : 멤버쉽 = 1 : N
    - 창작자 : 멤버쉽 = 1 : N
    """
    subscriber: 'Persona' = strawberry.field(description='구독자 페르소나')
    creator: 'Persona' = strawberry.field(description='창작자 페르소나')
    tier: Tier = strawberry.field(description='티어')
    created_at: datetime = strawberry.field(description='생성 일시')


@gql.django.type(models.Persona)
class Persona(relay.Node):
    """
    구독자, 구독 대상, 컨텐츠 작성자에 해당되는 페르소나
    User : Persona = 1 : N
    """
    owner: User = strawberry.field(User.get_user_with_info, description='소유자')
    nickname: str = strawberry.field(description='닉네임 (unique)')
    introduction: str = strawberry.field(description='소개')
    is_public: bool = strawberry.field(description='공개 여부')
    gender: Optional[Gender] = strawberry.field(description='성별')
    age: Optional[int] = strawberry.field(description='연령')
    job: Optional[str] = strawberry.field(description='직업')
    is_certified: bool = strawberry.field(description='공식 인증 여부')
    preferred_tags: relay.Connection['Tag'] = strawberry.field(description='선호 태그 목록')
    preferred_categories: relay.Connection['Category'] = strawberry.field(description='선호 카테고리 목록')

    following_personas: relay.Connection['Persona'] = strawberry.field(description='팔로잉 페르소나')

    created_at: datetime = strawberry.field(description='생성 일시')
    updated_at: datetime = strawberry.field(description='갱신 일시')


@gql.django.type(models.WaitFreePersona)
class WaitFreePersona(relay.Node):
    persona: Persona = strawberry.field(description='소유 페르소나')
    post: Post = strawberry.field(description="읽은 글")
    open_at: datetime = strawberry.field(description='개방 일시')

@gql.django.type(models.Challenge)
class Challenge(relay.Node):
    creator: Persona = strawberry.field(description='창작자 페르소나')
    title: str = strawberry.field(description='제목')
    content: str = strawberry.field(description='내용')
    created_at: datetime = strawberry.field(description='생성 일시')
    updated_at: datetime = strawberry.field(description='갱신 일시')
    

@gql.django.type(models.ChallengeObjective)
class ChallengeObjective(relay.Node):
    challenge: Challenge = strawberry.field(description='도전과제')
    title: str = strawberry.field(description='제목')
    content: str = strawberry.field(description='내용')
    created_at: datetime = strawberry.field(description='생성 일시')
    updated_at: datetime = strawberry.field(description='갱신 일시')

@gql.django.type(models.ChallengeHistory)
class ChallengeHistory(relay.Node):
    challenge: Challenge = strawberry.field(description='도전과제')
    persona: Persona = strawberry.field(description='참여 페르소나')
    is_done: bool = strawberry.field(description='완료 여부')
    created_at: datetime = strawberry.field(description='참여 일시')
