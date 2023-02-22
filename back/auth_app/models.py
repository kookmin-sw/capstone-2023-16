from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class MyUserManager(BaseUserManager):
    pass


class User(AbstractBaseUser):
    EMAIL = "EM"
    SIGN_UP_METHOD_CHOICES = [
        (EMAIL, "EMAIL"),
    ]
    USERNAME_FIELD = "email"
    objects = MyUserManager()

    email = models.EmailField(verbose_name="유저의 이메일", unique=True)
    username = models.CharField(max_length=254, unique=True)
    signup_method = models.CharField(
        max_length=2, choices=SIGN_UP_METHOD_CHOICES, default=EMAIL
    )
    picture_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시각")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="갱신 시각")

    class Meta:
        db_table = "users"


class EmailUser(models.Model):
    """Deprecated. `User` 모델을 사용하세요."""

    email = models.EmailField(verbose_name="유저의 이메일", unique=True)
    password = models.TextField(verbose_name="유저의 비밀번호")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시각")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="갱신 시각")

    class Meta:
        db_table = "email_users"


class Post(models.Model):
    # TODO: Tag, Read count, Category 추가 필요
    title = models.TextField(verbose_name="글 제목")
    content = models.TextField(verbose_name="글 내용")
    user_id = models.ForeignKey(
        User, verbose_name="글쓴이", on_delete=models.CASCADE
    )  # TODO: 추후 Persona id 로 변경 필요
    is_public = models.BooleanField(verbose_name="공개 여부", default=True)
    is_deleted = models.BooleanField(verbose_name="글 삭제 여부", default=False)

    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="생성 시각", null=True
    )
    updated_at = models.DateTimeField(
        auto_now_add=True, verbose_name="갱신 시각", null=True
    )
