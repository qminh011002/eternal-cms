/**
 * product controller
 */

import { factories } from "@strapi/strapi";
import { Product } from "../../../../types/product";
import { ProductVariant } from "../../../../types/product-variant";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          gallery: {
            fields: ["url"],
          },
        },
      };
      const { data, meta } = await super.find(ctx);

      console.log(data);

      const cleanData = (data as Product[]).map((item) => ({
        _id: item.documentId,
        title: item.title,
        price: item.price,
        gallery: (item.gallery ?? [])
          .slice(0, 2)
          .map((media) => media.formats?.thumbnail?.url ?? media.url ?? null),
      }));

      return { data: cleanData, meta };
    },

    async findOneByDocumentId(ctx) {
      const { documentId } = ctx.params;

      const entity = await strapi.documents("api::product.product").findOne({
        documentId,
        populate: {
          gallery: {
            fields: ["url"],
          },
          category: {
            fields: ["name", "documentId"],
          },
        },
      });

      if (!entity) {
        return ctx.notFound("Product not found");
      }

      const variantsRaw = await strapi
        .documents("api::product-variant.product-variant")
        .findMany({
          filters: { product: { documentId: { $eq: documentId } } },
        });

      // Strapi typings sometimes return an array, sometimes an object with .results; normalize here.
      const variants: ProductVariant[] = Array.isArray(variantsRaw)
        ? variantsRaw
        : ((variantsRaw as { results?: ProductVariant[] })?.results ?? []);

      const cleanData = {
        _id: entity.documentId,
        title: entity.title,
        subTitle: entity.subtitle,
        description: entity.description,
        category: entity.category
          ? {
              _id: entity.category.documentId,
              name: entity.category.name,
            }
          : null,
        gallery: (entity.gallery ?? []).map(
          (media) => media.formats?.thumbnail?.url ?? media.url ?? null,
        ),
        created_at: entity.createdAt,
        updated_at: entity.updatedAt,
      };

      const cleanedVariants = variants.map((variant) => {
        const resolvedPrice = variant.price ?? entity.price ?? null;
        const resolvedPriceAfterDiscount =
          variant.price_after_discount ??
          entity.price_after_discount ??
          resolvedPrice;

        return {
          sku: variant.sku,
          size_type: variant.size_type,
          size_value: variant.size_value,
          stock: variant.stock,
          is_active: variant.is_active,
          price: resolvedPrice,
          price_after_discount: resolvedPriceAfterDiscount,
        };
      });

      return {
        data: {
          ...cleanData,
          variants: cleanedVariants,
        },
      };
    },
  }),
);
