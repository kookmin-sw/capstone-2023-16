import graphql from "babel-plugin-relay/macro";

const categoryAllGetQuery = graphql`
    query categoryAllGetQuery {
        ...categoryPaginationFragment
    }
  `;

export default categoryAllGetQuery;