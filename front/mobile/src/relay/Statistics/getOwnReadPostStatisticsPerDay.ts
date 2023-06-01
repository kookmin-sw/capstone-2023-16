import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';

export const getOwnReadPostStatisticsPerDay = async (between: any) => {
  const query = graphql`
    query getOwnReadPostStatisticsPerDayQuery(
      $between: StatisticsDatetimeBetween!
    ) {
      getOwnReadPostStatisticsPerDay(between: $between) {
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
  console.log('getOwnReadPostStatisticsPerDay : ', response);
  return response;
};
