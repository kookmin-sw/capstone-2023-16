// GraphQl 
import { useLazyLoadQuery } from 'react-relay';
import follwerStatsAllGetQuery from '../../graphQL/Queries/follwerStatsAllGetQuery';
import { GetPersonaFollowerStatisticsInputType, PostReaderPersonaStatisticsInputType } from '../../graphQL/types/StatsType';
import postReaderStatisticsGetQuery from '../../graphQL/Queries/postReaderStatisticsGetQuery';

class StatsAPI {
  public follwerAllGet = (opt: GetPersonaFollowerStatisticsInputType) => {
    const queryData = useLazyLoadQuery(follwerStatsAllGetQuery, opt);
    return queryData;
  };

  public readerAllGet = (opt: PostReaderPersonaStatisticsInputType) => {
    const queryData = useLazyLoadQuery(postReaderStatisticsGetQuery, opt);
    return queryData;
  };
}

export default StatsAPI;
