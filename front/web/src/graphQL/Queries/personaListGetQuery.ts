import graphql from "babel-plugin-relay/macro";

const personaListGetQuery = graphql`
    query personaListGetQuery {
      ...personaPaginationFragment
    }
  `;

export default personaListGetQuery;