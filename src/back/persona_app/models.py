from django.db import models

from common_app.models import BaseModel


class Persona(BaseModel):
    class Gender(models.TextChoices):
        NONE = 'NO', '미입력'
        MALE = 'ML', '남성'
        FEMALE = 'FM', '여성'
    
    class AgeGroup(models.IntegerChoices):
        NONE = 0
        _10 = 1
        _20 = 2
        _30 = 3
        _40 = 4
        _50 = 5
        ELDER = 6

    user = models.ForeignKey('auth_app.User', null=False, verbose_name='대상 사용자', on_delete=models.CASCADE, db_column='user_id')
    nickname = models.CharField('닉네임', unique=True, max_length=20)
    introduction = models.TextField('소개', blank=True, default='자기 소개가 없습니다.')
    is_public = models.BooleanField('공개 여부', default=True)
    gender = models.CharField('성별', max_length=2, choices=Gender.choices, null=True, default=None)
    age_group = models.IntegerField('연령대', choices=AgeGroup.choices, null=True, default=None)
    job = models.CharField('직업', max_length=15, null=True, blank=True, default=None)
    is_certified = models.BooleanField('공인 여부', default=False)

    def __str__(self):
        return f"[{self.pk}] {self.user.id}:{self.nickname}"

    class Meta:
        db_table = 'personas'
        verbose_name = '구독 페르소나'
        verbose_name_plural = '구독 페르소나 목록'
