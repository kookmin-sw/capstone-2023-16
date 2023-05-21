import graphql from "babel-plugin-relay/macro";

const PostLikeListGetQuery = graphql`
    query PostLikeListGetQuery{
        ...PostLikePaginationFragment
    }
`;

export default PostLikeListGetQuery;
