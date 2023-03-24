import datetime
from typing import Tuple, Optional, List

from django.db.models import QuerySet

from graphql_app import models
from graphql_app.domain.category.exceptions import CategoryNotFoundException
from graphql_app.domain.persona.exceptions import PersonaNotFoundException
from graphql_app.models import Post, Persona, Category, Tag
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.RetreiveFilter import RetreiveFilter
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
    """
    게시물 목록을 조회하는 함수
    :param sorting_opt: 정렬 옵션
    :param filters: 적용할 필터링 목록
    :return: 조회된 게시물 목록
    """
    posts = Post.objects.filter(is_public=True, is_deleted=False)
    for field_filter in filters:
        if field_filter is not None:
            posts = field_filter.apply(posts)

    if sorting_opt.sort_by in (PostSortBy.ID, PostSortBy.CREATED_AT, PostSortBy.READ_CNT):
        order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_opt.sort_by.value
        posts = posts.order_by(order_by_prefix + order_by_suffix, 'id')

    return posts


def create_post(author_id: int, requested_user_id: int, title: str, content: str, category_id: int,
                paid_content: Optional[str] = None, tag_bodies: Optional[List[str]] = []) -> Post:
    """

    :param author_id: 게시물 생성을 요청한 페르소나의 ID
    :param requested_user_id: 게시물 생성을 요청한 사용자의 ID
    :param title: 게시물 제목
    :param content: 게시물 본문
    :param paid_content: 게시물 본문 (유료) (Optional)
    :param category_id: 소속 카테고리의 ID
    :param tag_bodies: 태그의 body 값이 담긴 list
    :return: 새로 생성된 Post
    :raises PersonaNotFoundException: 요청된 페르소나를 찾을 수 없거나, 요청한 사용자가 페르소나의 소유자가 아닌 경우
    :raises CategoryNotFoundException: category_id를 가지는 카테고리를 찾을 수 없는 경우
    """

    try:
        author: Persona = Persona.objects.get(id=author_id)
        category: Category = Category.objects.get(id=category_id)

        # 요청자가 게시글 작성자로 지정된 페르소나의 소유자가 아닌 경우
        # 요청된 페르소나를 찾을 수 없는 것으로 처리 (감춤)
        if author.owner.id != requested_user_id:
            raise Persona.DoesNotExist
    except Persona.DoesNotExist:
        raise PersonaNotFoundException
    except Category.DoesNotExist:
        raise CategoryNotFoundException
    else:
        new_post: Post = Post.objects.create(author=author, title=title, content=content,
                                             paid_content=paid_content, category=category)

        # 태그 연결 처리
        tag_pairs = Tag.insert_tags(tag_bodies)
        tags = list(map(lambda p: p[0], tag_pairs))
        new_post.tags.add(*tags)

        return new_post


def get_post(post_id: int) -> Post:
    return Post.objects.get(id=post_id)
