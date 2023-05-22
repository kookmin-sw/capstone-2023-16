// GraphQl 
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import tagAllGetQuery from '../../graphQL/Queries/tagAllGetQuery';
import { pagination_tagAllGetQuery } from '../../graphQL/Components/__generated__/pagination_tagAllGetQuery.graphql';
import tagPaginationFragment from '../../graphQL/Components/tagPaginationFragment';


class TagAPI {
  public tagAllGet = () => {
    const queryData = useLazyLoadQuery(tagAllGetQuery, []);
    return usePaginationFragment<pagination_tagAllGetQuery, any>(tagPaginationFragment, queryData);
  };
}

export default TagAPI;
