export interface CardProps {
  id: number;
  // username: string;
  nickname: string;
  // email: string;
  // profile: ImageSourcePropType;
  // isFollow: boolean;
}

export interface CardSectionProps {
  data: Array<CardProps>;
}
