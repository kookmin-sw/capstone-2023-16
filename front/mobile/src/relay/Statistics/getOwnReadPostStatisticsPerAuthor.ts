import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';

export const getOwnReadPostStatisticsPerAuthor = async (between: any) => {
  const query = graphql`
    query getOwnReadPostStatisticsPerAuthorQuery(
      $between: StatisticsDatetimeBetween!
    ) {
      getOwnReadPostStatisticsPerAuthor(between: $between) {
        elements {
          count
          label
        }
        totalCount
        unit
      }
    }
  `;
  const request = fetchQuery(RelayEnvironment, query, {between});
  const response = await request.toPromise();
  console.log('getOwnReadPostStatisticsPerAuthor : ', response);
  return response;
};
