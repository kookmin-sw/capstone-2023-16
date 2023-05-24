import RelayEnvironment from '../../RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
// @ts-ignore
import {graphql} from 'babel-plugin-relay/macro';
import {getAllOwnPersonasQuery} from './__generated__/getAllOwnPersonasQuery.graphql';

// 나의 페르소나 목록에 보여줄 페르소나들
export const getAllOwnPersonas = async () => {
  const query = graphql`
    query getAllOwnPersonasQuery {
      getOwnPersonas(sortingOpt: {direction: ASC}) {
        edges {
          node {
            id
            nickname
          }
        }
      }
    }
  `;
  const request = fetchQuery<getAllOwnPersonasQuery>(
    RelayEnvironment,
    query,
    {},
  );
  const response = await request.toPromise();
  return response?.getOwnPersonas;
};
