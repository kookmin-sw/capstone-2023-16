import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';
import {detail_getPostQuery} from './DetailPost';

export const getDetailContent = async (feed_id: string) => {
  const request = fetchQuery(RelayEnvironment, detail_getPostQuery, {
    id: feed_id,
  });
  const response = await request.toPromise();
  return response?.getPost;
};
