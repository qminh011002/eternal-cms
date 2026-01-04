export default {
  routes: [
    {
      method: "GET",
      path: "/products/:documentId",
      handler: "product.findOneByDocumentId",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
