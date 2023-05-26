import graphql from 'babel-plugin-relay/macro';

const follwerStatsAllGetQuery = graphql`
  query follwerStatsAllGetQuery($opt: GetPersonaFollowerStatisticsInput!) {
    getPersonaFollowersStatistics(opt: $opt) {
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

export default follwerStatsAllGetQuery;