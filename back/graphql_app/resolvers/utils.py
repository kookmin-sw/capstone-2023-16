import base64
from typing import List, Optional


def parse_global_id(global_id: str) -> tuple[str, int]:
    """
    Global ID 문자열을 decoding하여 타입 이름과 id를 반환하는 함수
    :param global_id: 파싱할 Global ID 문자열
    :return: 파싱된 타입 이름, id 쌍
    :raises binascii.Error: 파싱에 실패한 경우
    """
    decoded_id = base64.b64decode(global_id).decode("utf-8")
    type_prefix, original_id = decoded_id.split(":", 1)
    return type_prefix, int(original_id)


def parse_global_ids(global_ids: List[str]) -> tuple[Optional[str], List[int]]:
    """
    Global ID 문자열 목록을 전달 받아 decoding하여 타입 이름과 id 목록을 반환하는 함수
    단, 전달된 Global ID의 타입이 모두 같다고 가정한다.
    :param global_ids: 파싱할 Global ID가 저장된 리스트 (빈 배열일 경우 None)
    :return: 파싱된 타입 이름, id 목록 쌍
    :raises binascii.Error: 파싱에 실패한 경우
    """
    if not global_ids:
        return None, []
    else:
        decoded_ids = []
        for global_id in global_ids:
            decoded_id = base64.b64decode(global_id).decode("utf-8")
            type_prefix, original_id = decoded_id.split(":", 1)
            decoded_ids.append(int(original_id))

        return type_prefix, decoded_ids