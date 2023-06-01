/* eslint-disable prettier/prettier */
import graphql from "babel-plugin-relay/macro";

const PostLikePaginationFragment = graphql`
    fragment PostLikePaginationFragment on Query
        @refetchable(queryName: "pagination_PostLikeListGetQuery")
        @argumentDefinitions(
            first: {type: "Int", defaultValue: 20}
            after: {type: "String"}
        ) {
        getPublicPosts(first: $first, after: $after, sortingOpt: {sortBy: LIKE_CNT})
        @connection(key: "LikeEdges_getPublicPosts") {
            edges {
                node {
                    id
                    author {
                        id
                        nickname
                    }
                    contentPreview
                    tags {
                        edges {
                            node {
                                body
                            }
                        }
                    }
                    likeCnt
                    paidContent
                    bookmarkCnt
                    requiredMembershipTier
                    commentCnt
                    title
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            totalCount
        }
    }
`;

export default PostLikePaginationFragment;