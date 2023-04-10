from graphql_app import models
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

@gql.django.input(models.Challenge)
class CreateChallengeInput:
    title: str
    description: str

@gql.django.input(models.ChallengeObjective)
class CreateChallengeObjectiveInput:
    title: str
    description: str
    challenge: GlobalID


@gql.django.input(models.ChallengeHistory)
class CreateChallengeHistoryInput:
    challenge: GlobalID
    persona: GlobalID
    is_done: bool
