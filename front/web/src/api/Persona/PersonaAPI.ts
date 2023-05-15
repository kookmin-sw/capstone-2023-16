
// GraphQl 
import { commitMutation, useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import PersonaPaginationFragment from '../../graphQL/Components/personaPaginationFragment';
import personaListGetQuery from '../../graphQL/Queries/personaListGetQuery';
import { pagination_personaListGetQuery } from '../../graphQL/Components/__generated__/pagination_personaListGetQuery.graphql';
import environment from '../../RelayEnvironment';
import personaCreateMutation from '../../graphQL/Mutations/personaCreateMutation';
import { PersonaType } from '../../graphQL/types/PersonaType';


class PersonaAPI {
  public personaListGet = () => {
    const queryData = useLazyLoadQuery(personaListGetQuery, []);
    return usePaginationFragment<pagination_personaListGetQuery, any>(PersonaPaginationFragment, queryData);
  };

  public personaCreate = (form: PersonaType) => {
    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation: personaCreateMutation,
          variables: form,
          onCompleted: (data) => {
            alert("성공적으로 생성하였습니다.");
            resolve(data);
          },
          onError: (error) => {
            alert(error.message);
          }
        });
    });
  }
}

export default PersonaAPI;
