class DuplicatedCategoryBodyException(Exception):
    """
    이미 존재하는 body로 카테고리를 생성하려 할 때 발생하는 에러
    """


class CategoryNotFoundException(Exception):
    """
    요청된 쿼리로 카테고리를 찾을 수 없는 경우 발생
    """
