import User from './UserType';
import Relay from './Relay';
import {PageInfoType} from './PageInfoType';

export type PersonaType = {
  id?: string
  owner?: User
  nickname: string
  introduction?: string
  isPublic?: boolean
  gender?: string
  birthYear?: number
  job?: string
  isCertified?: boolean
  preferredTags?: ""
  preferredCategories?: {"id": string}[]|JSON
  createdAt?: Date
  updatedAt?: Date
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