/* eslint-disable prettier/prettier */
import graphql from "babel-plugin-relay/macro";

const PostPaginationFragment = graphql`
    fragment PostPaginationFragment on Query
        @refetchable(queryName: "pagination_PostListGetQuery")
        @argumentDefinitions(
            first: {type: "Int", defaultValue: 20}
            after: {type: "String"}
        ) {
        getPublicPosts(first: $first, after: $after, sortingOpt: {})
        @connection(key: "Edges_getPublicPosts") {
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

export default PostPaginationFragment;