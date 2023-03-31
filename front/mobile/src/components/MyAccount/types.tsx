import {ImageSourcePropType} from 'react-native';

export interface CardProps {
  id: number;
  username: string;
  email: string;
  profile: ImageSourcePropType;
  isFollow: boolean;
}

export interface CardSectionProps {
  data: Array<CardProps>;
}
