// GraphQl 
import { loadQuery, useFragment, useLazyLoadQuery, usePaginationFragment, useQueryLoader } from 'react-relay';
import postListGetQuery from '../../graphQL/Queries/postListGetQuery';
import { pagination_postListGetQuery } from '../../graphQL/Components/__generated__/pagination_postListGetQuery.graphql';
import postPaginationFragment from '../../graphQL/Components/postPaginationFragment';
import postGetQuery from '../../graphQL/Queries/postGetQuery';
import RelayEnvironment from '../../RelayEnvironment';
import postFragment from '../../graphQL/Components/postFragment';


class PostAPI {
  public postListGet = (id: string) => {
    const queryData = useLazyLoadQuery(postListGetQuery, { id });
    return usePaginationFragment<pagination_postListGetQuery, any>(postPaginationFragment, queryData);
  };

  public postGet = (postId: string) => {
    // const loadedQuery = loadQuery(
    //   RelayEnvironment,
    //   postGetQuery, 
    //   {postId}
    // )
    const queryData = useLazyLoadQuery(postGetQuery, { postId });
    return queryData;
    // console.log(useFragment(postFragment));
    //return useFragment(postFragment, queryData);
  }
}

export default PostAPI;
