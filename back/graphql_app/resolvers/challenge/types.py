from graphql_app import models
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

@gql.django.input(models.Challenge)
class CreateChallengeInput:
    title: str
    description: str
    max_persona_count: int

@gql.django.input(models.ChallengeObjective)
class CreateChallengeObjectiveInput:
    title: str
    description: str
    challenge: GlobalID
    duration_type: gql.auto
    kind: gql.auto


@gql.django.input(models.ChallengeObjectiveHistory)
class ToggleChallengeObjectiveInput:
    challenge_objective: GlobalID
    persona: GlobalID
