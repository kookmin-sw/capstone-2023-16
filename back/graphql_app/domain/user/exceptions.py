class UsernameDuplicationException(Exception):
    """
    이미 사용중인 username으로 유저 생성이 요청된 경우 발생
    """


class EmailDuplicationException(Exception):
    """
    이미 사용중인 email로 유저 생성/갱신이 요청된 경우 발생
    """


class WrongCertInfoException(Exception):
    """
    잘못된 인증 정보로 로그인을 시도한 경우 발생
    """
