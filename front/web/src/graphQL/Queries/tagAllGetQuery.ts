import graphql from "babel-plugin-relay/macro";

const tagAllGetQuery = graphql`
    query tagAllGetQuery {
        ...tagPaginationFragment
    }
  `;

export default tagAllGetQuery;