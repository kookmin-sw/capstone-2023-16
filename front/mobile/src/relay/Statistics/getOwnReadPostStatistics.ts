import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';

export const getOwnReadPostStatistics = async (opt: any) => {
  const query = graphql`
    query getOwnReadPostStatisticsQuery($opt: GetOwnReadPostStatisticsInput!) {
      getOwnReadPostStatistics(opt: $opt) {
        authorScores {
          birthYearScores {
            score
            label
          }
          categoryScores {
            label
            score
          }
          genderScores {
            score
            label
          }
          jobScores {
            label
            score
          }
          tagScores {
            score
            label
          }
        }
        categoryScores {
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
  console.log('stat : ', response);
  return response;
};
