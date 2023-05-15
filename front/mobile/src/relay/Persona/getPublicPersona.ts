import RelayEnvironment from '../../RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
// @ts-ignore
import {graphql} from 'babel-plugin-relay/macro';
import {getPublicPersonaQuery} from './__generated__/getPublicPersonaQuery.graphql';

// 타인의 마이페이지에서 보여줄 특정 페르소나 정보
export const getPublicPersona = async (personaId: string) => {
  const query = graphql`
    query getPublicPersonaQuery($personaId: GlobalID!) {
      getPublicPersona(personaId: $personaId) {
        nickname
        job
        id
        introduction
      }
    }
  `;
  const request = fetchQuery<getPublicPersonaQuery>(RelayEnvironment, query, {
    personaId,
  });
  const response = await request.toPromise();
  return response?.getPublicPersona;
};
