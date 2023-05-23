import RelayEnvironment from '../../RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
// @ts-ignore
import {graphql} from 'babel-plugin-relay/macro';

// 타인의 마이페이지에서 보여줄 특정 페르소나 정보
export const getPersonaPosts = async (authorFilter: any) => {
  const query = graphql`
    query getPersonaPostsQuery($authorFilter: AuthorFilter) {
      getPublicPosts(sortingOpt: {}, authorFilter: $authorFilter) {
        edges {
          node {
            bookmarkCnt
            author {
              id
              nickname
            }
            category {
              body
              id
            }
            commentCnt
            contentPreview
            id
            isPublic
            likeCnt
            title
          }
        }
      }
    }
  `;
  const request = fetchQuery(RelayEnvironment, query, {
    authorFilter,
  });
  const response = await request.toPromise();
  return response;
};
