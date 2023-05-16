from typing import Optional, List, Tuple

from django.core.handlers.wsgi import WSGIRequest
from django.db.models import QuerySet, Sum, Count
from strawberry.types import Info

from graphql_app.domain.persona.exceptions import NicknameDupliationException, NotPersonaOwnerException, \
    SelfFollowException
from graphql_app.models import Persona, User, Category, Tag, Bookmark
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.RetreiveFilter import RetreiveFilter
from graphql_app.resolvers.persona.enums import Gender
from graphql_app.resolvers.persona.enums import Job, PersonaSortBy
from graphql_app.resolvers.persona.types import PersonaSortingOption
from graphql_app.resolvers.utils import parse_global_id


def create_persona(owner: User, nickname: str, introduction: str, is_public: Optional[bool] = True,
                   gender: Optional[Gender] = None, birth_year: Optional[int] = None, job: Optional[Job] = None,
                   preferred_tag_bodies: Optional[List[str]] = [],
                   preferred_category_ids: Optional[List[int]] = []) -> Persona:
    """
    새 페르소나를 생성하는 함수
    :param owner: 페르소나 생성을 요청한 사용자
    :param nickname: 새 페르소나의 닉네임
    :param introduction: 새 페르소나 소개글
    :param is_public: 새 페르소나 공개 여부
    :param gender: 새 페르소나 성별 (Optional)
    :param birth_year: 새 페르소나 생년 (Optional)
    :param job: 새 페르소나 직업 (Optional)
    :param preferred_tag_bodies: 새 페르소나의 선호 태그 body 목록
    :param preferred_category_ids: 새 페르소나의 선호 카테고리의 GlobalID 목록
    :return: 생성된 새 페르소나
    :raises NicknameDupliationException: 이미 사용중인 nickname인 경우 발생
    """
    # nickname 중복 검사
    if Persona.objects.filter(nickname=nickname).exists():
        raise NicknameDupliationException

    # Enumeration이므로, string으로 변환해줌
    if gender:
        gender = gender.value
    if job:
        job = job.value

    # 카테고리 처리
    preferred_categories = Category.objects.filter(id__in=preferred_category_ids)

    # 태그 처리
    preferred_tags = list(map(lambda p: p[0], Tag.insert_tags(preferred_tag_bodies)))

    new_persona = Persona.objects.create(owner=owner, nickname=nickname, introduction=introduction,
                                         is_public=is_public, gender=gender, birth_year=birth_year, job=job)
    new_persona.preferred_categories.add(*preferred_categories)
    new_persona.preferred_tags.add(*preferred_tags)

    return new_persona


def persona_follow_toggle(requested_user: User, follower_persona: Persona, followee_persona: Persona) -> bool:
    """
    특정 페르소나에 대한 팔로우/언팔로우를 수행하는 함수
    follower_persona가 followee_persona를 팔로우 하고 있지 않았다면 팔로우를 수행하고,
    팔로우 하고 있었던 경우 언팔로우를 수행한다.
    :param requested_user: 팔로우/언팔로우를 요청한 사용자
    :param follower_persona: 팔로우/언팔로우를 요청한 페르소나
    :param followee_persona: 팔로우/언팔로우의 대상이 되는 페르소나
    :return: 팔로우한 경우 True, 언팔로우한 경우 False
    :raises NotPersonaOwnerException: 요청한 사용자가 팔로워 페르소나의 소유자가 아닌 경우
    :raises SelfFollowException: 스스로에 대한 팔로우/언팔로우를 요청한 경우
    """

    # 팔로우 토글을 요청한 유저가 페르소나의 소유주가 아닌 경우
    if follower_persona.owner != requested_user:
        raise NotPersonaOwnerException
    # 팔로잉 대상이 되는 페르소나와 팔로우 대상이 되는 페르소나와 같은 경우
    elif followee_persona == follower_persona:
        raise SelfFollowException
    # 정상 처리
    else:
        # 팔로우 상태가 아닌 경우 팔로우 상태로 전환
        if followee_persona not in follower_persona.following_personas.all():
            follower_persona.following_personas.add(followee_persona)
            follower_persona.save()
            followed = True
        # 팔로우 상태인 경우 언팔로우
        else:
            follower_persona.following_personas.remove(followee_persona)
            follower_persona.save()
            followed = False

        return followed


def get_personas(sorting_opt: PersonaSortingOption,
                 filters: Tuple[Optional[RetreiveFilter]]) -> QuerySet[Persona]:
    """
    페르소나 목록을 조회하는 함수
    :param sorting_opt: 정렬 옵션
    :param filters: 필터 목록
    :return: 필터링/정렬이 적용된 페르소나 목록
    """
    personas = Persona.objects.all()

    for field_filter in filters:
        if field_filter is not None:
            personas = field_filter.apply(personas)

    if sorting_opt.sort_by in (PersonaSortBy.ID, PersonaSortBy.NICKNAME, PersonaSortBy.CREATED_AT):
        order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_opt.sort_by.value
        personas = personas.order_by(order_by_prefix + order_by_suffix, 'id')
    else:
        # 게시물 조회수 총합이 많은 순
        if sorting_opt.sort_by == PersonaSortBy.TOTAL_POST_READ_CNT:
            personas = personas.annotate(
                total_post_read_cnt=Sum('written_posts__read_count')
            ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}total_post_read_cnt", 'id')
        elif sorting_opt.sort_by == PersonaSortBy.FOLLOWER_CNT:
            personas = personas.annotate(
                follower_cnt=Count('follower_personas')
            ).order_by(f"{'-' if sorting_opt.direction == SortingDirection.DESC else ''}follower_cnt", 'id')

    return personas


def get_persona_context(request: WSGIRequest) -> Optional[int]:
    """
    Django request 객체의 쿠키로부터 페르소나 id를 받아 오는 함수
    """
    if 'persona_id' in request.COOKIES.keys():
        _, persona_id = parse_global_id(request.COOKIES['persona_id'])
        return persona_id
    else:
        return None


def get_bookmarks(info: Info) -> QuerySet[Bookmark]:
    """
    요청한 사용자의 북마크를 반환하는 resolver
    """
    persona = info.context.request.persona
    bookmarks = Bookmark.objects.filter(persona=persona)
    return bookmarks


def get_persona(persona_id: int) -> Persona:
    return Persona.objects.get(id=persona_id)

def get_follower_personas(persona_id) -> List['Persona']:
    return []