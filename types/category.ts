import { Image } from './common';

export interface Category {
  id?: string;
  _id: string;
  name: string;
  description?: string;
  image: Image;
  slug: string;
  children?: Category[];
}
