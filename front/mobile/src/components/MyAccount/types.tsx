import {ImageSourcePropType} from 'react-native';

export interface CardProps {
  id: number;
  username: string;
  profile: ImageSourcePropType;
  isFollow: boolean;
}

export interface CardSectionProps {
  data: Array<CardProps>;
}
