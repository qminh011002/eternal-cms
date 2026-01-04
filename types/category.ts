// src/types/category.ts

import { BaseEntity } from './common';
import { Media } from './media';
import { Product } from './product';

export interface Category extends BaseEntity {
  name: string;
  slug?: string;
  description?: string;
  is_active: boolean;

  image?: Media[];

  products?: Product[];
}
