from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'hihi'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        self.stdout.write("HELLO!")
