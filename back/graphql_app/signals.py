from django.db.models.signals import pre_save
from django.dispatch import receiver

from graphql_app.models import Post


@receiver(pre_save, sender=Post)
def content_preview(sender, **kwargs):
    post: Post = kwargs['instance']

    # 요구 티어가 있는 경우 비공개
    if post.required_membership_tier:
        post.content_preview = None
    # 요구 티어가 없는 경우 글의 앞부분으로 갱신
    else:
        post.content_preview = post.generate_content_preview()
