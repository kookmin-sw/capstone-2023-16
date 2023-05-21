from django.contrib import auth
from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q

from graphql_app.domain.user.exceptions import UsernameDuplicationException, EmailDuplicationException, \
    WrongCertInfoException
from graphql_app.models import User


def create_user(username: str, email: str, password: str) -> User:
    """
    새 유저를 생성하는 함수
    :param username: 유저 ID
    :param email: 유저 이메일
    :param password: 유저 비밀번호
    :return: 생성된 유저
    :raise UsernameDuplicationException: 이미 사용중인 username인 경우
    :raise EmailDuplicationException: 이미 사용중인 email인 경우
    """
    duplicated_users = User.objects.filter(Q(username=username) | Q(email=email))
    # 해당 username 또는 email을 사용하는 사용자가 있는 경우 오류 발생
    if duplicated_users:
        # username 중복
        if duplicated_users.filter(username=username).exists():
            raise UsernameDuplicationException
        # email 중복
        elif duplicated_users.filter(email=email).exists():
            raise EmailDuplicationException
    # 유효한 정보인 경우 회원 가입 수행
    else:
        user = User.objects.create(username=username, email=email)
        user.set_password(password)
        user.save()
        return user


def find_user(username: str, password: str) -> User:
    """
    username, password로 사용자를 찾는 함수
    :param username: 찾을 사용자의 ID
    :param password: 찾을 사용자의 비밀번호
    :return: 검색된 사용자
    :raises WrongCertInfoException: 잘못된 인증 정보인 경우
    """
    user = User.objects.get(username=username)
    # 비밀번호 불일치
    if not user.check_password(password):
        raise WrongCertInfoException
    else:
        return user


def login(request: WSGIRequest, user: User) -> None:
    """
    사용자에 대한 로그인을 수행하는 함수 (sessionid 부여)
    :param request: Django request 객체
    :param user: 로그인을 수행할 사용자
    """
    auth.login(request, user)


def logout(request: WSGIRequest) -> None:
    """
    사용자에 대한 로그아웃을 수행하는 함수
    :param request: Django request 객체
    """
    auth.logout(request)
