import datetime
from typing import Tuple, Optional, List, Awaitable

from django.db.models import QuerySet, F

from graphql_app.domain.post.exceptions import PostNotFoundException
from graphql_app.models import Post, Persona, WaitFreePersona, PostReadingRecord
from graphql_app.domain.category.exceptions import CategoryNotFoundException
from graphql_app.domain.persona.exceptions import PersonaNotFoundException
from graphql_app.models import Post, Persona, Category, Tag, Membership
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.RetreiveFilter import RetreiveFilter
from graphql_app.resolvers.post.enums import PostSortBy
from graphql_app.resolvers.post.types import PostSortingOption


def is_eligible_for_paid_content(persona_id: int, post_id: int, current_user_id: int) -> bool:
    """
    유료 콘텐츠를 볼 수 있는 자격이 있는지 체크하는 함수
    - 조건 1 : 게시물의 작성자인 경우
    - 조건 2 : 기다무 기간이 끝난 경우
    - 조건 3 : 멤버쉽 회원인 경우
    :param persona_id: 조회를 요청한 페르소나의 ID
    :param post_id: 조회가 요청된 게시물의 ID
    :param current_user_id: 조회를 요청한 사용자의 ID
    :raises PostNotFoundException: 존재하지 않는 게시물인 경우
    :raises PersonaNotFoundException: persona_id로 페르소나를 찾을 수 없는 경우
    """

    try:
        post = Post.objects.get(id=post_id)
        requested_persona = Persona.objects.get(id=persona_id)
    except Post.DoesNotExist:
        raise PostNotFoundException
    except Persona.DoesNotExist:
        raise PersonaNotFoundException

    today = datetime.datetime.today()
    n_days_later = today + datetime.timedelta(days=WaitFreePersona.FREE_AFTER_DAYS)

    wait_free = WaitFreePersona.objects.get_or_create(persona_id=persona_id, post_id=post_id,
                                                      defaults={'open_at': n_days_later})[0]

    # 작성자인 경우
    is_author = (post.author == requested_persona and requested_persona.owner.id == current_user_id)
    # 멤버쉽에 등록된 경우
    is_membership_registered = Membership.objects.filter(creator=post.author, subscriber=requested_persona).exists()
    # 조회 가능 일시가 지난 경우
    is_waiting_over = (datetime.datetime.today() >= wait_free.open_at)

    return is_author or is_waiting_over or is_membership_registered


def has_required_tier(requested_persona_id: int, post: int | Post):
    """
    게시물의 content 필드를 조회하기 위한 요구 티어 이상을 갖추었음을 검증하는 함수
    :param requested_persona_id: 조회를 요청한 페르소나의 id
    :param post: 대상 게시물
    :return: 통과 여부
    """
    if isinstance(post, int):
        post: Post = Post.objects.get(id=post)

    if post.required_membership_tier is None:
        return None
    else:
        membership = Membership.objects.filter(creator=post.author, subscriber=requested_persona_id)
        if not membership:
            return False
        else:
            membership = membership[0]
            return membership.tier >= post.required_membership_tier


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


# TODO : 비동기적으로 실행되도록 리팩토링 필요
def increase_read_count(post_id: int, persona_id: int) -> None:
    """
    게시물의 조회수를 1만큼 올리는 함수
    """
    post_reading_record, is_created = PostReadingRecord.objects.get_or_create(post_id=post_id, persona_id=persona_id)
    post_reading_record.read_count = F('read_count') + 1
    post_reading_record.updated_at = datetime.datetime.now()
    post_reading_record.save(update_fields=['read_count', 'updated_at'])
