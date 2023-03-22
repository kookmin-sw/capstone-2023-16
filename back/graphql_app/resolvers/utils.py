import base64


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
