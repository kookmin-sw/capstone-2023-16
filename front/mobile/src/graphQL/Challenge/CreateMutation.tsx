import {graphql} from 'babel-plugin-relay/macro';

export const CreateMutation = graphql`
  mutation CreateMutationMutation(
    $title: String!
    $description: String!
    $personaCount: Int!
  ) {
    createChallenge(
      input: {
        title: $title
        description: $description
        maxPersonaCount: $personaCount
      }
    ) {
      id
      title
    }
  }
`;
