import {graphql} from 'babel-plugin-relay/macro';

export const ChanllengeGet = graphql`
  query ChallengeGetQuery {
    getAllChallenges {
      edges {
        node {
          id
          title
          personas {
            totalCount
          }
          maxPersonaCount
          description
        }
      }
    }
  }
`;
