import { Link } from "react-router-dom";
import { useAddressQuery } from "@/features/address/hooks";
import type { Address } from "@/types";

interface AddressSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function AddressSelector({ selectedId, onSelect }: AddressSelectorProps) {
  const { data: addresses = [], isLoading } = useAddressQuery();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading addresses...</p>;
  }

  if (addresses.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-4 text-center">
        <p className="text-gray-500">No saved addresses.</p>
        <Link
          to="/addresses"
          className="mt-2 inline-block text-sm font-medium text-secondary hover:underline"
        >
          Add New Address
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-3 font-semibold">Delivery Address</h3>
      <div className="space-y-2">
        {addresses.map((address: Address) => (
          <label
            key={address._id}
            className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${
              selectedId === address._id
                ? "border-secondary bg-secondary-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="delivery-address"
              value={address._id}
              checked={selectedId === address._id}
              onChange={() => onSelect(address._id)}
              className="mt-1 h-4 w-4 text-secondary focus:ring-secondary"
            />
            <div className="text-sm">
              <p className="font-medium">{address.name}</p>
              <p className="text-gray-600">
                {address.street}, {address.city}, {address.state} {address.zipCode}
              </p>
              <p className="text-gray-500">Phone: {address.phone}</p>
            </div>
          </label>
        ))}
      </div>
      <Link
        to="/addresses"
        className="mt-3 inline-block text-sm font-medium text-secondary hover:underline"
      >
        + Add New Address
      </Link>
    </div>
  );
}
