import { ProductsGrid, FiltersPanel } from "./components";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Button } from "@/shared/ui";

export function ProductsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <div className="mt-2 flex gap-0 bg-white dark:bg-slate-900">
        <aside aria-label="Product filters" className="hidden w-64 shrink-0 border-r p-4 dark:border-slate-700 lg:block">
          <FiltersPanel />
        </aside>
        <div className="fixed bottom-4 right-4 z-40 lg:hidden">
          <Button
            onClick={() => setFiltersOpen(true)}
            size="sm"
            className="shadow-lg"
          >
            <FaFilter className="mr-2" /> Filters
          </Button>
        </div>
        <Dialog
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          className="relative z-50 lg:hidden"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-start justify-end">
            <Dialog.Panel className="h-full w-80 overflow-y-auto bg-white p-4 shadow-xl dark:bg-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <Dialog.Title className="text-lg font-bold text-primary dark:text-primary-300">
                  Filters
                </Dialog.Title>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  {"\u2715"}
                </button>
              </div>
              <FiltersPanel />
            </Dialog.Panel>
          </div>
        </Dialog>
        <main className="flex-1 p-4">
          <ProductsGrid />
        </main>
      </div>
    </>
  );
}
