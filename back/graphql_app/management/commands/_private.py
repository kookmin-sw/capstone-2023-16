from django.db.models import QuerySet

from graphql_app.models import Persona


def get_targets() -> QuerySet[Persona]:
    return Persona.objects.all()
