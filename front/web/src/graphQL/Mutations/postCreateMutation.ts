import graphql from 'babel-plugin-relay/macro';

const postCreateMutation = graphql`
  mutation postCreateMutation(
    $title: String!, $content: String!, $paidContent: String=null, $tagBodies: [String!]=[], $category: NodeInput!
  ) {
    postCreate(newPostInput:{title: $title, content: $content, paidContent: $paidContent, tagBodies: $tagBodies, category: $category}) {
      ... on Post {
        id
        title
        content
        createdAt
      }
    }
  }
`;

export default postCreateMutation;