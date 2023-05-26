import graphql from 'babel-plugin-relay/macro';

const postReaderStatisticsGetQuery = graphql`
  query postReaderStatisticsGetQuery($opt: PostReaderPersonaStatisticsInput!) {
    getPostReaderStatistics(opt: $opt) {
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

export default postReaderStatisticsGetQuery;