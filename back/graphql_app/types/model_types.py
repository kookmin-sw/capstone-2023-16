from datetime import datetime
from typing import Optional, List

import strawberry
from strawberry import auto
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay

from graphql_app import models
from graphql_app.types.enums import Gender


@strawberry.django.type(models.User)
class User:
    id: auto
    username: auto = strawberry.field(description='사용자 ID (Unique)')
    email: auto = strawberry.field(description='사용자 E-mail (Unique)')
    signup_method: auto = strawberry.field(description='로그인 방법')

    created_at: auto = strawberry.field(description='생성 시각')
    updated_at: auto = strawberry.field(description='갱신 시각')

    @classmethod
    def get_all_users(cls):
        return models.User.objects.all()


@strawberry.django.type(models.Post)
class Post(relay.Node):
    id: auto
    title: auto = strawberry.field(description='글 제목')
    content: auto = strawberry.field(description='글 내용')


@gql.django.type(models.Post)
class Post(relay.Node):
    title: str = strawberry.field(description='글 제목')
    content: str = strawberry.field(description='글 내용')
    tags: List['Tag'] = strawberry.field(description='태그 목록')


@gql.django.type(models.Persona)
class Persona(relay.Node):
    """
    구독자, 구독 대상, 컨텐츠 작성자에 해당되는 페르소나
    User : Persona = 1 : N
    """
    user: User = strawberry.field(User.get_all_users, description='소유자')
    nickname: str = strawberry.field(description='닉네임 (unique)')
    introduction: bool = strawberry.field(description='소개')
    is_public: bool = strawberry.field(description='공개 여부')
    gender: Optional[Gender] = strawberry.field(description='성별')
    age: Optional[int] = strawberry.field(description='연령')
    job: Optional[str] = strawberry.field(description='직업')
    is_certified: bool = strawberry.field(description='공식 인증 여부')

    created_at: datetime = strawberry.field(description='생성 일시')
    updated_at: datetime = strawberry.field(description='갱신 일시')


@gql.django.type(models.Tag)
class Tag(relay.Node):
    """
    Post를 설명하거나, Persona의 선호 대상이 되는 태그
    - Post : Tag = N : M
    - Persona : Tag = N : M
    """
    body: str = strawberry.field(description='태그 본문')
    created_at: datetime = strawberry.field(description='생성 일시')

