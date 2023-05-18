import strawberry
from strawberry.scalars import JSON


@strawberry.type
class ImageUploadUrl:
    url: str
    fields: JSON
