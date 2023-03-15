from enum import Enum
from typing import Iterable, cast, Optional

import strawberry
from strawberry.types import Info
from strawberry_django_plus import gql, relay

from graphql_app.types.enums import SortingDirection
from graphql_app.types.model_types import Tag
from graphql_app.models import Tag as TagModel


@strawberry.enum
class TagSortBy(Enum):
    """
    태그 정렬 기준
    """
    ID = 'id'
    LEXICOGRAPHICAL = 'body'
    CREATED_AT = 'created_at'
    PERSONA_PREFERENCE_CNT = '선호 페르소나 수 기준'
    POST_CONNECTION_CNT = '연결된 게시물 수 기준'


@gql.type
class Query:
    tag: Optional[Tag] = relay.node()

    @strawberry.input
    class TagSortingRule:
        """
        태그 목록 조회 시 적용할 정렬 방법
        """
        sort_by: Optional[TagSortBy] = strawberry.field(default=TagSortBy.ID, description='정렬 기준')
        direction: Optional[SortingDirection] = strawberry.field(default=SortingDirection.ASC, description='정렬 방향')

    @gql.django.connection
    def get_all_tags(self, info: Info, sorting_opt: TagSortingRule) -> Iterable[Tag]:
        """
        등록된 모든 태그의 목록
        """

        if sorting_opt.sort_by in (TagSortBy.ID, TagSortBy.LEXICOGRAPHICAL, TagSortBy.CREATED_AT):
            order_by_prefix = '' if sorting_opt.direction == SortingDirection.ASC else '-'
            order_by_suffix = sorting_opt.sort_by.value
            tags = TagModel.objects.all().order_by(order_by_prefix + order_by_suffix, 'id')
        else:
            # 해당 태그를 선호하는 페르소나 수 기준 (공개 페르소나만)
            if sorting_opt.sort_by == TagSortBy.PERSONA_PREFERENCE_CNT:
                tags = TagModel.objects.raw(f"""
                        SELECT tags.id, body, count(*)
                        FROM tags
                            LEFT JOIN personas_preferred_tags ppt on tags.id = ppt.tag_id
                                LEFT JOIN personas p on ppt.persona_id = p.id
                        WHERE p.is_public=true OR ISNULL(p.is_public)
                        GROUP BY tag_id, body
                        ORDER BY COUNT(*) {sorting_opt.direction.name}, tags.id ASC;""")

            # 연결된 게시물 수 기준 (공개 페르소나 및 공개 포스트만)
            elif sorting_opt.sort_by == TagSortBy.POST_CONNECTION_CNT:
                tags = TagModel.objects.raw(f"""
                        SELECT tags.id, body
                        FROM tags
                            LEFT OUTER JOIN graphql_app_post_tags post_tag on tags.id = post_tag.tag_id
                                LEFT OUTER JOIN graphql_app_post post on post_tag.post_id = post.id
                                    LEFT OUTER JOIN personas on post.author_persona_id = personas.id
                        WHERE ((post.is_public=true OR ISNULL(post.is_public))
                            and (personas.is_public=true OR ISNULL(personas.is_public)))
                        GROUP BY tags.id, body
                        ORDER BY COUNT(*) {sorting_opt.direction.name}, tags.id ASC;""")

        return cast(Iterable[Tag], tags)
