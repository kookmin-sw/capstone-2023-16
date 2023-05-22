import {graphql} from 'babel-plugin-relay/macro';

export const persona_LBQuery = graphql`
  query PersonaLBGetQuery($id: GlobalID!) {
    getPublicPersona(personaId: $id) {
      bookmarks {
        post {
          id
        }
      }
      likedPosts {
        id
      }
    }
  }
`;
