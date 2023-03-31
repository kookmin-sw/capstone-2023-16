from django.apps import AppConfig


class GraphqlAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "graphql_app"

    def ready(self):
        import graphql_app.signals
