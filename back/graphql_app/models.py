from typing import List, Tuple

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class MyUserManager(BaseUserManager):
    pass


class User(AbstractBaseUser):
    EMAIL = 'EM'
    SIGN_UP_METHOD_CHOICES = [
        (EMAIL, 'EMAIL'),
    ]
    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    is_staff = models.BooleanField(default=False)
    email = models.EmailField(verbose_name='유저의 이메일', unique=True)
    username = models.CharField(max_length=254, unique=True)
    signup_method = models.CharField(max_length=2, choices=SIGN_UP_METHOD_CHOICES, default=EMAIL)
    picture_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='생성 시각')
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='갱신 시각')

    class Meta:
        db_table = 'user'
        verbose_name = '사용자'
        verbose_name = '사용자 목록'


class Post(models.Model):
    title = models.TextField(verbose_name="글 제목")
    content = models.TextField(verbose_name="글 내용")
    paid_content = models.TextField(verbose_name="무료 내용", blank=True, null=True, default="")

    author = models.ForeignKey('graphql_app.Persona', on_delete=models.CASCADE, db_column='author_persona_id',
                               related_name='written_posts', verbose_name="글쓴이")
    is_public = models.BooleanField(verbose_name="공개 여부", default=True)
    is_deleted = models.BooleanField(verbose_name="글 삭제 여부", default=False)

    tags = models.ManyToManyField('graphql_app.Tag', related_name='related_posts', verbose_name='연관 태그 목록')
    category = models.ForeignKey('graphql_app.Category', related_name='including_posts', null=True, blank=True,
                                 default=None, on_delete=models.SET_NULL, verbose_name='카테고리')

    read_count = models.IntegerField(default=0, null=False, blank=True, verbose_name='조회수')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='생성 시각', null=True)
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='갱신 시각', null=True)

    class Meta:
        db_table = 'post'
        verbose_name = '게시물'
        verbose_name_plural = '게시물 목록'


class Persona(models.Model):
    owner = models.ForeignKey('graphql_app.User', null=False, verbose_name='대상 사용자', on_delete=models.CASCADE,
                              db_column='owner_user_id')
    nickname = models.CharField('닉네임', unique=True, max_length=20)
    introduction = models.TextField('소개', null=True, blank=True, default='자기 소개가 없습니다.')
    is_public = models.BooleanField('공개 여부', null=False, blank=True, default=True)
    gender = models.CharField('성별', max_length=2, null=True, blank=True, default=None)
    age = models.PositiveIntegerField('연령대', null=True, blank=True, default=None)
    job = models.CharField('직업', max_length=15, null=True, blank=True, default=None)
    is_certified = models.BooleanField('공인 여부', default=False)

    preferred_tags = models.ManyToManyField('graphql_app.Tag', related_name='preferred_users_as_tag',
                                            verbose_name='선호 태그 목록')
    preferred_categories = models.ManyToManyField('graphql_app.Category', related_name='preferred_users_as_category',
                                                  verbose_name='선호 카테고리 목록')

    following_personas = models.ManyToManyField('graphql_app.Persona', related_name='follower_personas',
                                                verbose_name='팔로우 하고 있는 페르소나 목록')

    created_at = models.DateTimeField('생성 시각', auto_now_add=True)
    updated_at = models.DateTimeField('갱신 시각', auto_now=True)

    def __str__(self):
        return f"[{self.pk}] {self.owner.id}:{self.nickname}"

    class Meta:
        db_table = 'persona'
        verbose_name = '페르소나'
        verbose_name_plural = '페르소나 목록'


class Tag(models.Model):
    MIN_TAG_BODY_LEN = 2
    MAX_TAG_BODY_LEN = 20

    body = models.CharField(max_length=MAX_TAG_BODY_LEN, null=False, blank=False, unique=True, verbose_name='태그 본문')
    created_at = models.DateTimeField('생성 시각', auto_now_add=True)

    class Meta:
        db_table = 'tag'
        verbose_name = '태그'
        verbose_name_plural = '태그 목록'

    @classmethod
    def check_length(cls, body: str) -> int:
        """
        Tag body의 길이 유효성을 검증하는 함수
        -1 : 최소 길이보다 짧은 경우
        0 : 정상 (유효)
        +1 : 최대 길이보다 긴 경우
        """
        if len(body) < cls.MIN_TAG_BODY_LEN:
            return -1
        elif len(body) > cls.MAX_TAG_BODY_LEN:
            return 1
        else:
            return 0

    @classmethod
    def insert_tags(cls, bodies: List[str]) -> List[Tuple['Tag', bool]]:
        """
        tag body 리스트를 입력 받아 각각 insert를 수행한다.
        반환 리스트의 각각의 요소 첫번째 요소는 insert된 Tag 객체,
        두번째 요소는 create인 경우 True, Retreive인 경우 False.
        """
        unique_bodies = set(bodies)

        for body in unique_bodies:
            cls.check_length(body)

        tags = [
            cls.objects.get_or_create(body=body)
            for body in unique_bodies
        ]

        return tags


class Category(models.Model):
    MIN_CATEGORY_BODY_LEN = 1
    MAX_CATEGORY_BODY_LEN = 20

    body = models.CharField(max_length=MAX_CATEGORY_BODY_LEN, null=False, blank=False,
                            unique=True, verbose_name='카테고리 본문')
    created_at = models.DateTimeField('생성 시각', auto_now_add=True)

    class Meta:
        db_table = 'categorie'
        verbose_name = '카테고리'
        verbose_name_plural = '카테고리 목록'

    @classmethod
    def check_length(cls, body: str) -> int:
        """
        Category body의 길이 유효성을 검증하는 함수
        -1 : 최소 길이보다 짧은 경우
        0 : 정상 (유효)
        +1 : 최대 길이보다 긴 경우
        """
        if len(body) < cls.MIN_CATEGORY_BODY_LEN:
            return -1
        elif len(body) > cls.MAX_CATEGORY_BODY_LEN:
            return 1
        else:
            return 0


class WaitFreePersona(models.Model):
    persona = models.ForeignKey('graphql_app.Persona', on_delete=models.CASCADE,
                                db_column='persona_id', verbose_name="글쓴이")
    post = models.ForeignKey('graphql_app.Post', on_delete=models.CASCADE, db_column='post_id', verbose_name="게시물")
    open_at = models.DateTimeField('공개 시각', null=False, blank=False)
    created_at = models.DateTimeField('생성 시각', auto_now_add=True)
    updated_at = models.DateTimeField('생성 시각', auto_now_add=True)

    class Meta:
        db_table = 'wait_free_persona'
        unique_together = ('persona', 'post')
