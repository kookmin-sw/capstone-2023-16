import graphql from 'babel-plugin-relay/macro';

const logoutPostMutation = graphql`
  mutation logoutPostMutation {
    logout
  }
`;

export default logoutPostMutation;