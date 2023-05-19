// GraphQl 
import { commitMutation, loadQuery, useFragment, useLazyLoadQuery, usePaginationFragment, useQueryLoader } from 'react-relay';
import postListGetQuery from '../../graphQL/Queries/postListGetQuery';
import { pagination_postListGetQuery } from '../../graphQL/Components/__generated__/pagination_postListGetQuery.graphql';
import postPaginationFragment from '../../graphQL/Components/postPaginationFragment';
import postGetQuery from '../../graphQL/Queries/postGetQuery';
import postFragment from '../../graphQL/Components/postFragment';
import postCreateMutation from '../../graphQL/Mutations/postCreateMutation';
import { PostCreationType } from '../../graphQL/types/PostType';
import environment from '../../RelayEnvironment';


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
  };

  public postCreate = (input: PostCreationType) => {
    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation: postCreateMutation,
          variables: input,
          onCompleted: (data) => {
            alert("성공적으로 생성하였습니다.");
            resolve(data);
          },
          onError: (error) => {
            alert(error.message);
          }
        });
    });
  }


}

export default PostAPI;
