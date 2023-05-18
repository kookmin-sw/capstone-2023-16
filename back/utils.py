from typing import List, Tuple, Any


def dict_to_2d_list(original: dict) -> Tuple[List[Any], List[Any]]:
    keys = list(original.keys())
    values = [original[key] for key in keys]

    return (keys, values)
