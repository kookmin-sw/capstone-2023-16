import graphql from "babel-plugin-relay/macro";

const postListGetQuery = graphql`
    query postListGetQuery($id: GlobalID!) {
      ...postPaginationFragment @arguments(id: $id)
    }
  `;

export default postListGetQuery;