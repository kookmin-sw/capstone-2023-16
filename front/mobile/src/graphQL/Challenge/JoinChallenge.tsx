import {graphql} from 'babel-plugin-relay/macro';

export const JoinChallenge = graphql`
  mutation JoinChallengeMutation(
    $challengeId: GlobalID!
    $personaId: GlobalID!
  ) {
    joinChallenge(input: {challengeId: $challengeId, personaId: $personaId}) {
      ... on Challenge {
        id
      }
    }
  }
`;
