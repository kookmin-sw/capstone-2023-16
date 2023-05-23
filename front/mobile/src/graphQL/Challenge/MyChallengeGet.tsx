import {graphql} from 'babel-plugin-relay/macro';

export const MyChanllengeGet = graphql`
  query MyChallengeGetQuery($personaId: GlobalID!) {
    getMyChallenges(personaId: $personaId) {
      edges {
        node {
          personas {
            totalCount
          }
          maxPersonaCount
          description
          id
          title
        }
      }
    }
  }
`;
