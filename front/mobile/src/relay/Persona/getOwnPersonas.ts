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
            preferredTags {
              edges {
                node {
                  id
                  body
                }
              }
            }
            preferredCategories {
              edges {
                node {
                  body
                  id
                }
              }
            }
            birthYear
            followingPersonas {
              edges {
                node {
                  id
                  nickname
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
            introduction
            job
            nickname
            id
            gender
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
