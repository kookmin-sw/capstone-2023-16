
// GraphQl 
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import PersonaPaginationFragment from '../../graphQL/Components/personaPaginationFragment';
import personaListGetQuery from '../../graphQL/Queries/personaListGetQuery';
import { pagination_personaListGetQuery } from '../../graphQL/Components/__generated__/pagination_personaListGetQuery.graphql';


class PersonaAPI {
  public personaListGet = () => {
    const queryData = useLazyLoadQuery(personaListGetQuery, []);
    return usePaginationFragment<pagination_personaListGetQuery, any>(PersonaPaginationFragment, queryData);
  };
}

export default PersonaAPI;
