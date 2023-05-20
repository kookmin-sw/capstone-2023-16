// GraphQl 
import { useLazyLoadQuery } from 'react-relay';
import follwerStatsAllGetQuery from '../../graphQL/Queries/follwerStatsAllGetQuery';
import { GetPersonaFollowerStatisticsInputType } from '../../graphQL/types/Stats';

class StatsAPI {
  public follwerAllGet = (opt: GetPersonaFollowerStatisticsInputType) => {
    const queryData = useLazyLoadQuery(follwerStatsAllGetQuery, opt);
    return queryData;
  };
}

export default StatsAPI;
