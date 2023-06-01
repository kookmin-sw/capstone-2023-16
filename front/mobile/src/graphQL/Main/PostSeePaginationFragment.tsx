// import graphql from 'babel-plugin-relay/macro';

// const PostSeePaginationFragment = graphql`
//   fragment PostSeePaginationFragment on Query
//   @refetchable(queryName: "pagination_PostSeeListGetQuery")
//   @argumentDefinitions(
//     first: {type: "Int", defaultValue: 20}
//     after: {type: "String"}
//   ) {
//     getPublicPosts(
//       first: $first
//       after: $after
//       sortingOpt: {sortBy: READ_CNT}
//     ) @connection(key: "Edges_getPublicPosts") {
//       edges {
//         node {
//           id
//           author {
//             id
//             nickname
//           }
//           contentPreview
//           tags {
//             edges {
//               node {
//                 body
//               }
//             }
//           }
//           likeCnt
//           paidContent
//           bookmarkCnt
//           requiredMembershipTier
//           commentCnt
//           title
//         }
//       }
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//       totalCount
//     }
//   }
// `;

// export default PostSeePaginationFragment;
