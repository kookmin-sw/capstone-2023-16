
// GraphQl 
import { commitMutation, graphql, useFragment, useMutation, usePaginationFragment } from 'react-relay';
import environment from '../../RelayEnvironment';
import PersonasFragment from '../../graphQL/Components/PersonasFragment';
import PersonaConnection from '../../graphQL/Components/PersonaConnection';
import {  PersonasFragmentPersonaList_getOwnPersonas$key as Key} from '../../graphQL/Components/__generated__/PersonasFragmentPersonaList_getOwnPersonas.graphql';
import { PersonasGetQuery } from '../../graphQL/Components/__generated__/PersonasGetQuery.graphql';


class PersonaAPI {
  public personaListGet = () => {
    const {data } = usePaginationFragment<PersonasGetQuery, Key>(
        PersonasFragment, null)
    console.log('data:', data);
    return data;
  };
  
}

export default PersonaAPI;
