import graphql from "babel-plugin-relay/macro";

const PostIdListGetQuery = graphql`
    query PostIdListGetQuery{
        ...PostIdPaginationFragment
    }
`;

export default PostIdListGetQuery;
