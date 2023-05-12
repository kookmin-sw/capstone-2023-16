import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';
import {getOwnPersonas} from './getOwnPersonas';

export const getInitPersona = async () => {
  const query = graphql`
    query getInitPersonaQuery {
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
  const request = fetchQuery(RelayEnvironment, query, {});
  const response = await request.toPromise();
  return response?.getOwnPersonas.edges;
};
