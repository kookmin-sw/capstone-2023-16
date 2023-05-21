import {graphql} from 'babel-plugin-relay/macro';

export const CheckMembershipQuery = graphql`
  query CheckMembershipQuery {
    getOwnMemberships(mode: SUBSCRIBER, sortingOpt: {}) {
      edges {
        node {
          tier
          creator {
            id
          }
        }
      }
    }
  }
`;
