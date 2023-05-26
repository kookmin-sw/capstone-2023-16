import {Dispatch, SetStateAction} from 'react';

export interface CardProps {
  id: string;
  open: boolean;
  title: string;
  max: number;
  current: number;
  body: string;
  setRender?: Dispatch<SetStateAction<boolean>>;
}

export interface CardSectionProps {
  data: Array<CardProps>;
}
