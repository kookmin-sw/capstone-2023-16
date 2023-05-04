
// GraphQl 
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { PersonaAPIPersonasGetQuery } from './__generated__/PersonaAPIPersonasGetQuery.graphql';
import PersonaPaginationFragment from '../../graphQL/Components/personaPaginationFragment';
import personaListGetQuery from '../../graphQL/Queries/personaListGetQuery';


class PersonaAPI {
  public personaListGet = () => {
    const queryData = useLazyLoadQuery(personaListGetQuery, []);
    return usePaginationFragment<PersonaAPIPersonasGetQuery, any>(PersonaPaginationFragment, queryData);
  };
}

export default PersonaAPI;
