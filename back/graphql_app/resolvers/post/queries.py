import os
from typing import Optional, Iterable, cast

import boto3
from strawberry.types import Info
from strawberry_django_plus import gql
from strawberry_django_plus.relay import GlobalID

from graphql_app.domain.persona.core import get_persona_context
from graphql_app.domain.post.core import get_posts, get_post, increase_read_count
from graphql_app.resolvers.decorators import admin_only
from graphql_app.resolvers.helpers import DatetimeBetween
from graphql_app.resolvers.model_types import Post
from graphql_app.resolvers.post.types import PostSortingOption, AuthorFilter, TitleFilter, CategoryFilter, TagFilter, \
    IsPublicFilter, IsDeletedFilter

from back.graphql_app.types.post.post import ImageUploadUrl


@gql.type
class Query:
    @gql.django.connection
    def get_public_posts(self, info: Info,
                         sorting_opt: PostSortingOption,
                         created_at_filter: Optional[DatetimeBetween] = None,
                         author_filter: Optional[AuthorFilter] = None,
                         title_filter: Optional[TitleFilter] = None,
                         category_filter: Optional[CategoryFilter] = None,
                         tags_filter: Optional[TagFilter] = None
                         ) -> Iterable[Post]:
        """
        공개된 모든 게시물의 목록
        """
        filters = (IsPublicFilter(True), IsDeletedFilter(False),
                   created_at_filter, author_filter, title_filter, category_filter, tags_filter)
        posts = get_posts(sorting_opt, filters)
        return cast(Iterable[Post], posts)

    @gql.field
    def get_post(self, info: Info, post_id: GlobalID) -> Post:
        """
        게시물 한 건 조회
        """
        post_id: int = int(post_id.node_id)
        post = get_post(post_id)

        persona_id: Optional[int] = get_persona_context(info.context.request)
        try:
            if persona_id:
                increase_read_count(post_id, persona_id)
        except Exception as e:
            # TODO : 로그는 남겨야 하지 않을까,,?
            print(e)
            pass

        return post

    @gql.django.connection
    @admin_only
    def get_entire_posts(self, info: Info,
                         sorting_opt: PostSortingOption,
                         created_at_filter: Optional[DatetimeBetween] = None,
                         author_filter: Optional[AuthorFilter] = None,
                         title_filter: Optional[TitleFilter] = None,
                         category_filter: Optional[CategoryFilter] = None,
                         tags_filter: Optional[TagFilter] = None) -> Iterable[Post]:
        """
        시스템에 등록된 모든 게시물의 목록
        """
        filters = (created_at_filter, author_filter, title_filter, category_filter, tags_filter)
        posts = get_posts(sorting_opt, filters)
        return cast(Iterable[Post], posts)

    @gql.field
    def get_image_upload_url(self, info: Info, image_name: str) -> ImageUploadUrl:
        s3_client = boto3.client('s3',
                                 region_name="ap-northeast-2",
                                 aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
                                 aws_secret_access_key=os.environ.get("S3_SECRET_ACCESS_KEY"))
        response = s3_client.generate_presigned_post("postona-images",
                                                     image_name,
                                                     ExpiresIn=30 * 60)

        return ImageUploadUrl(**response)
