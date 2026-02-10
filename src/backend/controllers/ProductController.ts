import { Response } from "miragejs";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

export const getAllProductsHandler = function (this: MirageSchema) {
  return new Response(200, {}, { products: this.db.products });
};

export const getProductHandler = function (_schema: MirageSchema, request: MirageRequest) {
  const productId = request.params.productId;
  try {
    const product = _schema.products.findBy({ _id: productId });
    return new Response(200, {}, { product });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
