from django.db.models import QuerySet


class RetreiveFilter:
    def apply(self, qs: QuerySet) -> QuerySet:
        raise NotImplemented('This method must be overwriten.')
