
// GraphQl 
import { commitMutation, useFragment, useMutation, usePaginationFragment } from 'react-relay';
import environment from '../../RelayEnvironment';
import getOwnPersonasQuery from '../../graphQL/Queries/PersonasGetQuery';
import PersonasFragment from '../../graphQL/Components/PersonasFragment';
import PersonaConnection from '../../graphQL/Components/PersonaConnection';
import type { PersonasFragment$key } from '../../graphQL/Components/__generated__/PersonasFragment.graphql';
import PersonasGetQuery from '../../graphQL/Queries/PersonasGetQuery';


class PersonaAPI {
  public personaListGet = (props: any) => {
    const { data } = usePaginationFragment(PersonasGetQuery, null);
    console.log('data:', data);
    return ;
  
  };
  
}

export default PersonaAPI;
