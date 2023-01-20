from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField('생성 시각', auto_now_add=True)
    updated_at = models.DateTimeField('갱신 시각', auto_now=True)

    class Meta:
        abstract = True
