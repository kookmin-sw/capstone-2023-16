from django.db import IntegrityError
from django.db.models import QuerySet

from graphql_app.domain.membership.enums import Tier
from graphql_app.domain.membership.exceptions import AlreadyJoinedException, MembershipNotFoundException, \
    SelfJoinDeniedException
from graphql_app.models import Persona, Membership
from graphql_app.resolvers.enums import SortingDirection
from graphql_app.resolvers.membership.types import MembershipSortingOption, MembershipSortBy


def create_membership(subscriber: Persona, creator: Persona, tier: Tier) -> Membership:
    """
    새 멤버쉽을 생성하는 함수
    :param subscriber: 구독자 페르소나
    :param creator: 구독 대상 페르소나
    :param tier: 멤버쉽 티어
    :return: 생성된 새 멤버쉽
    :raises SelfJoinDeniedException: subscriber와 creator가 같은 경우 발생
    :raises AlreadyJoinedException: 이미 멤버쉽에 가입되어 있는 경우 발생
    """
    # 구독자와 창작자가 같을 수 없음
    if subscriber == creator:
        raise SelfJoinDeniedException

    try:
        membership = Membership.objects.create(subscriber=subscriber, creator=creator, tier=tier.value)
    # 이미 멤버쉽에 가입한 경우
    except IntegrityError:
        raise AlreadyJoinedException
    else:
        return membership


def remove_membership(subscriber: Persona, creator: Persona) -> None:
    """
    멤버쉽을 삭제하는 함수
    :param subscriber: 구독자 페르소나
    :param creator: 구독 대상 페르소나
    :return: None
    :raises MembershipNotFoundException: 전달된 인자로 멤버쉽을 찾을 수 없는 경우
    """
    try:
        membership = Membership.objects.get(subscriber=subscriber, creator=creator)
    # 멤버쉽에 가입한 적이 없는 경우
    except Membership.DoesNotExist:
        raise MembershipNotFoundException
    else:
        membership.delete()


def get_own_memberships(persona: Persona, get_as: str,
                        sorting_opt: MembershipSortingOption) -> QuerySet[Membership]:
    """
    특정 페르소나와 연관된 멤버쉽 목록을 반환하는 함수
    :param persona: 조회를 요청한 페르소나
    :param get_as: 구독자로서 조회, 또는 창작자로서 조회를 의미함 (각각 'subscriber', 'creator')
    :param sorting_opt: 정렬 옵션
    :return: 조회된 멤버쉽의 목록
    :raises ValueError: 알 수 없는 `get_as`인 경우
    """
    get_as = get_as.lower()

    if get_as == 'subscriber':
        memberships = Membership.objects.filter(subscriber=persona)
    elif get_as == 'creator':
        memberships = Membership.objects.filter(creator=persona)
    else:
        raise ValueError(f"Unknown parameter get_as={get_as}")

    if sorting_opt.sort_by in (MembershipSortBy.ID, MembershipSortBy.CREATED_AT, MembershipSortBy.TIER,
                               MembershipSortBy.SUBSCRIBER_NICKNAME, MembershipSortBy.CREATOR_NICKNAME):
        order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
        order_by_suffix = sorting_opt.sort_by.value
        memberships = memberships.order_by(order_by_prefix + order_by_suffix, 'id')

    return memberships
