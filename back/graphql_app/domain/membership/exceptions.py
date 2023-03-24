class AlreadyJoinedException(Exception):
    """
    이미 멤버쉽에 가입되어 있는 경우 발생
    """


class SelfJoinDeniedException(Exception):
    """
    스스로 멤버쉽에 가입하려는 경우 발생
    """


class MembershipNotFoundException(Exception):
    """
    요청된 멤버쉽이 존재하지 않는 경우 발생
    """
