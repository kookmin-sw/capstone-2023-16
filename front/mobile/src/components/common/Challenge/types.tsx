export interface CardProps {
  id: string;
  open: boolean;
  title: string;
  max: number;
  current: number;
  body: string;
}

export interface CardSectionProps {
  data: Array<CardProps>;
}
