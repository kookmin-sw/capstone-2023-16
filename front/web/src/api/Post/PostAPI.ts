// GraphQl 
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import postListGetQuery from '../../graphQL/Queries/postListGetQuery';
import { pagination_postListGetQuery } from '../../graphQL/Components/__generated__/pagination_postListGetQuery.graphql';
import postPaginationFragment from '../../graphQL/Components/postPaginationFragment';


class PostAPI {
  public postOwnget = (id: string) => {
    const queryData = useLazyLoadQuery(postListGetQuery, {id});
    return usePaginationFragment<pagination_postListGetQuery, any>(postPaginationFragment, queryData);
  };
}

export default PostAPI;
