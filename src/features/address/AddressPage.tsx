import { useState } from "react";
import { useAddressQuery } from "./hooks";
import { AddressCard } from "./components/AddressCard";
import { AddressForm } from "./components/AddressForm";
import { Button } from "@/shared/ui";
import type { Address } from "@/types";

export function AddressPage() {
  const { data: addresses = [], isLoading } = useAddressQuery();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingAddress(undefined);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-center text-gray-500">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Add New Address</Button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <AddressForm address={editingAddress} onClose={handleClose} />
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center gap-4 py-12">
          <p className="text-xl text-secondary">No saved addresses</p>
          <p className="text-gray-500">Add a delivery address to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
