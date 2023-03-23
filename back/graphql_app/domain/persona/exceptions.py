class NicknameDupliationException(Exception):
    """
    이미 사용중인 닉네임으로 Persona에 대한 생성/갱신이 요청된 경우 발생
    """


class NotPersonaOwnerException(Exception):
    """
    본인의 페르소나가 아닌 페르소나에 대한 허용되지 않은 작업이 요청된 경우 발생
    """


class SelfFollowException(Exception):
    """
    스스로 팔로우 하려는 경우 발생
    """

