from typing import Dict

from django.db.models import QuerySet

from graphql_app.resolvers.enums import StringFindMode


class RetreiveFilter:
    """
    QuerySet 객체를 인자로 받아 각각의 조건으로 filter하여
    qs에 적용 및 반환하기 위한 인터페이스
    """

    def apply(self, qs: QuerySet) -> QuerySet:
        """
        :param qs: filtering을 적용할 QuerySet 객체
        :return: filtering이 적용된 QuerySet 객체
        """
        raise NotImplemented('This method must be overwriten.')


class StringRetrieveFilter(RetreiveFilter):
    """
    문자열 검색 조건을 적용하기 위한 인터페이스
    """

    # 자식 필터 클래스에서 dictionary 인자 방식으로 filter 적용을 위해 사용
    mode_suffix: Dict[StringFindMode, str] = {
        StringFindMode.EXACTLY: '',
        StringFindMode.CONTAINS: '__contains',
        StringFindMode.STARTS_WITH: '__startswith',
        StringFindMode.ENDS_WITH: '__endswith',
    }
