from django.core.management.base import BaseCommand, CommandError

from graphql_app.management.commands._private import get_targets


class Command(BaseCommand):
    help = 'THIS IS PASSWORD'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        targets = get_targets()
        for target in targets:
            self.stdout.write(str(target))
