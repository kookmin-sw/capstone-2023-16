import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';

export const getOwnReadPostStatisticsPerWeekday = async (between: any) => {
  const query = graphql`
    query getOwnReadPostStatisticsPerWeekdayQuery(
      $between: StatisticsDatetimeBetween!
    ) {
      getOwnReadPostStatisticsPerWeekday(between: $between) {
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
  console.log('getOwnReadPostStatisticsPerWeekday : ', response);
  return response;
};
