import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import {PersonaLBGetQuery} from './__generated__/PersonaLBGetQuery.graphql';
import RelayEnvironment from '../../RelayEnvironment';

export const PersonaLBGetquery = graphql`
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

export const persona_LBQuery = async (id: string) => {
  const request = fetchQuery<PersonaLBGetQuery>(
    RelayEnvironment,
    PersonaLBGetquery,
    {id},
  );
  const response = await request.toPromise();
  return response!.getPublicPersona;
};
