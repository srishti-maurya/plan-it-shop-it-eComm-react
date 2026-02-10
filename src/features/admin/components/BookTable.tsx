import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ConfirmDialog } from "@/shared/ui";
import type { Product } from "@/types";

interface BookTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function BookTable({ products, onEdit, onDelete }: BookTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-4 py-3">Cover</th>
              <th scope="col" className="px-4 py-3">Title</th>
              <th scope="col" className="px-4 py-3">Author</th>
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3">Price</th>
              <th scope="col" className="px-4 py-3">Rating</th>
              <th scope="col" className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-700">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-9 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-slate-200">
                  {product.title}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{product.author}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{product.categoryName}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">₹{product.price}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-slate-400">{product.rating}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      aria-label="Edit"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="rounded p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      aria-label="Delete"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="py-8 text-center text-gray-500 dark:text-slate-400">No products found</p>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Book"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={() => {
          if (deleteTarget) onDelete(deleteTarget._id);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
