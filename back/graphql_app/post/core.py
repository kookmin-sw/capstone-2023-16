import datetime

from graphql_app import models


def is_eligible_paid_content(persona_id: int, post_id: int) -> bool:
    """
    유료 콘텐츠를 볼 수 있는 자격이 있는지 체크합니다
    """
    membership_registered = False # TODO: membership 기능 추가할 때 수정 필요
    today = datetime.datetime.today()
    three_days_later = today + datetime.timedelta(days=3)

    wait_free = models.WaitFreePersona.objects.get_or_create(persona_id=persona_id, post_id=post_id,
                                             defaults={'open_at': three_days_later})[0]

    return (datetime.datetime.today() >= wait_free.open_at) or \
            membership_registered
