import strawberry
from strawberry.types import Info

from firebase_app.cloud_messaging import service


@strawberry.type
class Mutation:
    @strawberry.mutation
    def send_fcm(self, info: Info, token: str, title: str, body: str) -> None:
        service.send_message(token, title, body)
