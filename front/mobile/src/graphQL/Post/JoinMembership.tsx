import {graphql} from 'babel-plugin-relay/macro';

export const Join_MembershipMutation = graphql`
  mutation JoinMembershipMutation($id: GlobalID!) {
    joinMembership(joinInput: {creator: {id: $id}, tier: TIER_1}) {
      ... on Membership {
        id
      }
      ... on AuthInfoRequiredError {
        __typename
      }
    }
  }
`;
