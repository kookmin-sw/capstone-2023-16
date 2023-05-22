import {graphql} from 'babel-plugin-relay/macro';

export const CreateItemMutation = graphql`
  mutation CreateItemMutation(
    $title: String!
    $description: String!
    $challenge: GlobalID!
    $durationType: DurationType!
    $kind: ParticipateKind!
  ) {
    createChallengeObjective(
      input: {
        title: $title
        description: $description
        challenge: $challenge
        durationType: $durationType
        kind: $kind
      }
    ) {
      id
    }
  }
`;
