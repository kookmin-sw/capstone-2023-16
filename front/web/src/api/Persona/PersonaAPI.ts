
// GraphQl 
import { commitMutation, useFragment, useLazyLoadQuery, useMutation, usePaginationFragment } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from '../../RelayEnvironment';
import PersonaConnection from '../../graphQL/Components/PersonaConnection';
import {  PersonasFragmentPersonaList_getOwnPersonas$key as Key} from '../../graphQL/Components/__generated__/PersonasFragmentPersonaList_getOwnPersonas.graphql';
import { PersonasGetQuery } from '../../graphQL/Components/__generated__/PersonasGetQuery.graphql';


class PersonaAPI {
  public personaListGet = () => {
    const queryData = useLazyLoadQuery(
      graphql`
        query PersonaAPIPersonasGetQuery {
          ...PersonaAPIPersonasFragmentPersonaList_getOwnPersonas
        }
      `, []);
  
    const { data } = usePaginationFragment<PersonasGetQuery, any>(
      graphql`
      fragment PersonaAPIPersonasFragmentPersonaList_getOwnPersonas on Query
        @refetchable(queryName: "PersonaAPIPersonasGetPaginationQuery")
        @argumentDefinitions(
          first: {type: "Int", defaultValue: 10}
          after: {type: "String"}
        ) {
          getOwnPersonas(first: $first, after: $after, sortingOpt: {})
          @connection(key: "Edges_getOwnPersonas") {
            edges {
              node {
                id
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
    `, queryData)
    console.log('data:', data);
    return data;
  };
}

export default PersonaAPI;
