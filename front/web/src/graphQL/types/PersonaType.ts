import User from './UserType';
import Relay from './Relay';
import {PageInfoType} from './PageInfoType';

export type PersonaType = {
  id: string
  owner: User
  nickname: string
  introduction: boolean
  isPublic: boolean
  gender?: number
  age?: number
  job?: string
  isCertified: boolean
  preferredTags: Relay
  preferredCategories: Relay
  createdAt: Date
  updatedAt: Date
};

export type PersonaEdgeType = {
  cursor: string
  node: PersonaType
};

export type PersonaConnectionType = {
  pageInfo: PageInfoType
  edges: PersonaEdgeType[],
  totalCount?: number
};