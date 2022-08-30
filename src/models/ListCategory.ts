import {Book} from './Book';

export type ListCategory = {
  id?: number;
  priority?: number;
  thumbnail?: string;
  name?: string;
  isHighlight?: boolean;
  isShowInApp?: boolean;
  books?: Array<Book>;
};
