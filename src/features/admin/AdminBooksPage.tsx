import { useState } from "react";
import { Button } from "@/shared/ui";
import { SkeletonTable } from "@/shared/components";
import { BookForm, BookTable } from "./components";
import { useAdminProductsQuery, useAdminCreateProduct, useAdminUpdateProduct, useAdminDeleteProduct } from "./hooks";
import type { BookFormData } from "./schemas";
import type { Product } from "@/types";

export function AdminBooksPage() {
  const { data: products = [], isLoading } = useAdminProductsQuery();
  const createProduct = useAdminCreateProduct();
  const updateProduct = useAdminUpdateProduct();
  const deleteProduct = useAdminDeleteProduct();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleCreate = (data: BookFormData) => {
    createProduct.mutate(data, {
      onSuccess: () => setShowForm(false),
    });
  };

  const handleUpdate = (data: BookFormData) => {
    if (!editingProduct) return;
    updateProduct.mutate(
      { productId: editingProduct._id, product: data },
      { onSuccess: () => setEditingProduct(undefined) }
    );
  };

  const handleDelete = (productId: string) => {
    deleteProduct.mutate(productId);
  };

  const handleEdit = (product: Product) => {
    setShowForm(false);
    setEditingProduct(product);
  };

  if (isLoading) return (
    <div className="space-y-6">
      <div className="h-8 w-24 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
      <SkeletonTable />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Books</h2>
        {!showForm && !editingProduct && (
          <Button onClick={() => setShowForm(true)}>Add Book</Button>
        )}
      </div>

      {showForm && (
        <BookForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isSubmitting={createProduct.isPending}
        />
      )}

      {editingProduct && (
        <BookForm
          product={editingProduct}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProduct(undefined)}
          isSubmitting={updateProduct.isPending}
        />
      )}

      <BookTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
