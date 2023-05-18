import graphql from "babel-plugin-relay/macro";

const PostListGetQuery = graphql`
    query PostListGetQuery{
        ...PostPaginationFragment
    }
`;

export default PostListGetQuery