import { Response } from "miragejs";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

export const getAllCategoriesHandler = function (this: MirageSchema) {
  try {
    return new Response(200, {}, { categories: this.db.categories });
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

export const getCategoryHandler = function (_schema: MirageSchema, request: MirageRequest) {
  const categoryId = request.params.categoryId;
  try {
    const category = _schema.categories.findBy({ _id: categoryId });
    return new Response(200, {}, { category });
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
