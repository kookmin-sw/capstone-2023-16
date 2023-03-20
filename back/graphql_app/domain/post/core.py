import datetime
from typing import Tuple, Optional

from django.db.models import QuerySet

from graphql_app import models
from graphql_app.models import Post
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.interfaces import RetreiveFilter
from graphql_app.resolvers.post.enums import PostSortBy
from graphql_app.resolvers.post.types import PostSortingOption


def is_eligible_for_paid_content(persona_id: int, post_id: int, current_user_id: int) -> bool:
    """
    유료 콘텐츠를 볼 수 있는 자격이 있는지 체크합니다
    """

    post = models.Post.objects.get(id=post_id)
    persona = models.Persona.objects.get(id=persona_id)

    membership_registered = False  # TODO: membership 기능 추가할 때 수정 필요
    today = datetime.datetime.today()
    three_days_later = today + datetime.timedelta(days=3)

    wait_free = models.WaitFreePersona.objects.get_or_create(persona_id=persona_id, post_id=post_id,
                                                             defaults={'open_at': three_days_later})[0]

    return (post.author_id == persona_id and persona.owner_id == current_user_id) or \
        ((datetime.datetime.today() >= wait_free.open_at) or membership_registered)


def get_posts(sorting_opt: PostSortingOption,
              filters: Tuple[Optional[RetreiveFilter]]) -> QuerySet[Post]:
    posts = Post.objects.filter(is_public=True, is_deleted=False)
    for field_filter in filters:
        if field_filter is not None:
            posts = field_filter.apply(posts)

    if sorting_opt.sort_by in (PostSortBy.ID, PostSortBy.CREATED_AT, PostSortBy.READ_CNT):
        order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_opt.sort_by.value
        posts = posts.order_by(order_by_prefix + order_by_suffix, 'id')

    return posts