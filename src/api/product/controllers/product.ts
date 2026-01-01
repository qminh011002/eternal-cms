/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);

      const cleanData = data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
      }));

      return { data: cleanData, meta };
    },
  })
);
