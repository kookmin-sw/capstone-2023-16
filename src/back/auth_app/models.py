from django.db import models
from django.contrib.auth.models import AbstractUser
from common_app.models import BaseModel


class User(AbstractUser, BaseModel):
    first_name = last_name = None

    def __str__(self) -> str:
        return f"[{self.pk}] {self.username}"

    class Meta:
        db_table = 'users'
        verbose_name = '사용자'
        verbose_name_plural = '사용자 목록'
