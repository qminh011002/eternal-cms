export default {
  async afterCreate(event) {
    const { result, params } = event;

    const productDocFromPayload =
      params.data?.product?.connect?.documentId ?? params.data?.product?.connect?.id;

    const variantWithProduct = await strapi
      .documents("api::product-variant.product-variant")
      .findOne({
        documentId: result.documentId,
        populate: {
          product: {
            fields: ["documentId"],
          },
        },
      });

    const productDocumentId =
      productDocFromPayload ?? variantWithProduct?.product?.documentId ?? null;

    if (!result.sku && productDocumentId) {
      await strapi.documents("api::product-variant.product-variant").update({
        documentId: result.documentId,
        data: { sku: `${productDocumentId}-${result.documentId}` },
      });
    }
  },
};
