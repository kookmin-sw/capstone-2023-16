from datetime import datetime

from graphql_app import models


def is_eligible_paid_content(persona_id, post_id):
    """
    유료 콘텐츠를 볼 수 있는 자격이 있는지 체크합니다
    """
    membership_registered = False
    wait_free = models.WaitFreePersona.objects.get(persona_id=persona_id, post_id=post_id)

    return (datetime.today() >= wait_free.open_at) or membership_registered
