import { Image } from './common';

export interface BootcampCategory {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  image: Image;
  slug: string;
  children: BootcampCategory[];
}
