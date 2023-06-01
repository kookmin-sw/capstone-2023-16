import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';

export const getFollowingPersonasStatistics = async (opt: any) => {
  const query = graphql`
    query getFollowingPersonasStatisticsQuery {
      getFollowingPersonasStatistics(opt: {resultLimit: 10}) {
        birthYearScores {
          label
          score
        }
        categoryScores {
          label
          score
        }
        genderScores {
          label
          score
        }
        jobScores {
          label
          score
        }
        tagScores {
          label
          score
        }
      }
    }
  `;
  const request = fetchQuery(RelayEnvironment, query, {opt});
  const response = await request.toPromise();
  console.log('getFollowingPersonasStatistics : ', response);
  return response;
};
