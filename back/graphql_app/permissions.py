import binascii

from django.core.handlers.wsgi import WSGIRequest

from graphql_app.models import Persona
from graphql_app.resolvers.utils import parse_global_id


def has_weak_persona_context(request: WSGIRequest) -> bool:
    """
    Request cookie에 페르소나의 ID(persona_id)가 저장되어 있는지 확인하는 함수
    실제 존재하는 페르소나인지는 확인하지 않는다.
    :param request: Django 요청 객체
    :return: sessionid와 persona_id가 있는 경우 True, 그렇지 않은 경우 False
    """
    cookies = request.COOKIES

    if not (request.user.is_authenticated and 'persona_id' in cookies):
        return False
    else:
        return True


def has_persona_context(request: WSGIRequest):
    """
    Request cookie에 페르소나의 ID(persona_id)가 저장되어 있으며,
    실제 DB에 페르소나가 존재하고, 요청한 사용자의 소유인지 확인하는 함수
    True를 반환하는 경우, request.persona에 해당 페르소나를 연결한다.
    :param request: Django 요청 객체
    :return: 통과된 경우 True, 그렇지 않은 경우 False
    """
    has_weak_context = has_weak_persona_context(request)

    if not has_weak_context:
        return False
    else:
        cookies = request.COOKIES
        try:
            _, persona_id = parse_global_id(cookies['persona_id'])
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
