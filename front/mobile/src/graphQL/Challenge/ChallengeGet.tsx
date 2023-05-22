import {graphql} from 'babel-plugin-relay/macro';

export const ChanllengeGetQuery = graphql`
  query ChallengeGetQuery {
    getAllChallenges {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
