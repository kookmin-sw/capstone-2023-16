from typing import Optional
import strawberry


@strawberry.interface
class Error:
    message: str
    code: Optional[int]
