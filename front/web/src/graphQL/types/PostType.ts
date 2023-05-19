import User from './UserType';
import Relay from './Relay';
import {PageInfoType} from './PageInfoType';

export type PostCreationType = {
  title: string,
  content: string,
  paidContent: string,
  tagbodies: string[],
  category?: { id: string },
};

export type PostCreationEdgeType = {
  cursor: string
  node: PostCreationType
};
