import binascii
from typing import Optional, Tuple

from django.core.handlers.wsgi import WSGIRequest

from graphql_app.domain.persona.core import get_persona_context
from graphql_app.models import Persona


def has_weak_persona_context(request: WSGIRequest) -> Tuple[bool, Optional[int]]:
    """
    Request header, 또는 Cookie에 유효한 Session key와 페르소나의 ID(persona_id)가 저장되어 있는지 확인하는 함수
    실제 존재하는 페르소나인지는 확인하지 않는다.
    :param request: Django 요청 객체
    :return: (존재 여부, persona_id)
    """

    persona_id: Optional[int] = get_persona_context(request)

    if (request.user.is_authenticated and persona_id is not None):
        return (True, persona_id)
    else:
        return (False, None)


def has_persona_context(request: WSGIRequest):
    """
    Request header 또는 Cookie에 페르소나의 ID(persona_id)가 저장되어 있으며,
    실제 DB에 페르소나가 존재하고, 요청한 사용자의 소유인지 확인하는 함수
    True를 반환하는 경우, request.persona에 해당 페르소나를 연결한다.
    :param request: Django 요청 객체
    :return: 통과된 경우 True, 그렇지 않은 경우 False
    """
    has_weak_context, persona_id = has_weak_persona_context(request)

    if not has_weak_context:
        return False
    else:
        try:
            persona = Persona.objects.get(id=persona_id)
            if persona.owner != request.user:
                raise Persona.DoesNotExist()
        # 해당 id를 가지는 페르소나가 없거나, 소유주가 아닌 경우
        except Persona.DoesNotExist:
            return False
        # 파싱 실패
        except binascii.Error:
            return False
        else:
            request.persona = persona
            return True
