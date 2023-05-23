import {getOwnPersonasQuery} from './__generated__/getOwnPersonasQuery.graphql';
import RelayEnvironment from '../../RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
// @ts-ignore
import {graphql} from 'babel-plugin-relay/macro';

// 마이페이지에서 보여줄 나의 특정 페르소나 정보
export const getOwnPersonas = async (nickname: string) => {
  const query = graphql`
    query getOwnPersonasQuery($nickname: String!) {
      getOwnPersonas(
        nicknameFilter: {token: $nickname}
        sortingOpt: {sortBy: ID}
      ) {
        edges {
          node {
            birthYear
            bookmarks {
              id
              post {
                contentPreview
                author {
                  id
                  nickname
                }
                id
                title
                likeCnt
                bookmarkCnt
                commentCnt
              }
            }
            id
            gender
            introduction
            isCertified
            isPublic
            job
            likedPosts {
              author {
                id
                nickname
              }
              bookmarkCnt
              commentCnt
              contentPreview
              id
              likeCnt
              title
            }
            nickname
            preferredCategories {
              edges {
                node {
                  body
                  id
                }
              }
            }
            preferredTags {
              edges {
                node {
                  body
                  id
                }
              }
            }
            followerPersonas {
              edges {
                node {
                  id
                  nickname
                }
              }
            }
            followingPersonas {
              edges {
                node {
                  id
                  nickname
                }
              }
            }
          }
        }
      }
    }
  `;
  const request = fetchQuery<getOwnPersonasQuery>(RelayEnvironment, query, {
    nickname,
  });
  const response = await request.toPromise();
  return response?.getOwnPersonas.edges[0].node;
};
