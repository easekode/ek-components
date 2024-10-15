import { Image } from './common';

export interface Client {
  name?: string;
  description?: string;
  image: Image[];
}
