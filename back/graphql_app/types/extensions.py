from graphql import GraphQLError
from strawberry.extensions import Extension


class ExtendErrorFormat(Extension):
    def on_operation(self):
        yield
        result = self.execution_context.result

        if getattr(result, "errors", None):
            for i, error in enumerate(result.errors):
                extension = error.extensions
                extension['__typename'] = error.original_error.__class__.__name__

                if getattr(error.original_error, 'additional_info', None):
                    extension['additionalInfo'] = error.original_error.additional_info

                result.errors[i] = GraphQLError(
                    nodes=error.nodes,
                    source=error.source,
                    positions=error.positions,
                    path=error.path,
                    original_error=error.original_error,
                    message=error.message,
                    extensions=error.extensions
                )
