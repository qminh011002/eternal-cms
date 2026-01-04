// src/types/product-variant.ts

export type SizeType = "Ring Size" | "Necklace Size" | "Bracelet Size";

export interface ProductVariant {
  documentId: string;

  sku?: string;
  price?: number | null;
  price_after_discount?: number | null;
  stock?: number | null;
  is_active?: boolean | null;
  size_type?: SizeType | null;
  size_value?: string | null;
}
