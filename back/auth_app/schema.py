import typing

import strawberry
from django.contrib.auth import authenticate, login
from strawberry.types.info import Info


@strawberry.type
class Book:
    title: str
    author: str


@strawberry.type
class UserResponse:
    username: str


@strawberry.type
class Query:
    books: typing.List[Book]


def get_books():
    return [
        Book(
            title="The Great Gatsby",
            author="F. Scott Fitzgerald",
        ),
    ]


@strawberry.type
class Query:
    books: typing.List[Book] = strawberry.field(resolver=get_books)


@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "world"


@strawberry.type
class Mutation:
    @strawberry.mutation
    def register(self, info: Info, username: str, password: str) -> bool:
        user = authenticate(username=username, password=password)
        if not user:
            raise AssertionError
        login(info.context.request, user)
        return True


schema = strawberry.Schema(query=Query, mutation=Mutation)
