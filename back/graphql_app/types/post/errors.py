import typing

from strawberry import BasePermission
from strawberry.types import Info

from graphql_app import models
from graphql_app.post.core import is_eligible_for_paid_content


class IsEligibleForPaidContent(BasePermission):
    message = "유료 콘텐츠에 대해 권한이 없습니다."

    def has_permission(self, source: typing.Any, info: Info, **kwargs) -> bool:
        post_id = source.id if source else info.variable_values['postId'].node_id
        post = models.Post.objects.get(id=post_id)

        persona_id = source.author.id if source else info.variable_values['personaId'].node_id
        persona = models.Persona.objects.get(id=persona_id)

        return (post.author_id == persona_id and persona.owner_id == info.context.request.user.id) or \
            is_eligible_for_paid_content(persona_id, post_id)
