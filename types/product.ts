// src/types/product.ts

import { Category } from "./category";
import { Media } from "./media";
import { BlocksContent } from "./common";
import { ProductVariant } from "./product-variant";

export type Currency = "VND" | "USD";
export type DiscountType = "percent" | "fixed";

export interface Product {
  documentId: string;

  title: string;
  subtitle?: string;
  description?: BlocksContent; // Strapi Blocks rich text
  price: number;
  price_after_discount?: number;
  discount_start_at?: string; // ISO datetime
  discount_end_at?: string; // ISO datetime

  gallery?: Media[];

  is_active: boolean;

  category?: Category;
  variants?: ProductVariant[];

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
