import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, Badge } from "@/shared/ui";
import { useDeleteAddress, useUpdateAddress } from "../hooks";
import type { Address } from "@/types";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
}

export function AddressCard({ address, onEdit }: AddressCardProps) {
  const deleteAddress = useDeleteAddress();
  const updateAddress = useUpdateAddress();

  return (
    <div className="relative rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-card dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-card-dark">
      {address.isDefault && (
        <Badge variant="bestseller" className="absolute right-3 top-3">
          Default
        </Badge>
      )}
      <p className="font-semibold dark:text-slate-200">{address.name}</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{address.street}</p>
      <p className="text-sm text-gray-600 dark:text-slate-400">
        {address.city}, {address.state} {address.zipCode}
      </p>
      <p className="text-sm text-gray-600 dark:text-slate-400">Phone: {address.phone}</p>
      <div className="mt-3 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(address)}
        >
          <FaEdit className="mr-1 inline h-3 w-3" aria-hidden="true" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={() => deleteAddress.mutate(address._id)}
        >
          <FaTrash className="mr-1 inline h-3 w-3" aria-hidden="true" />
          Delete
        </Button>
        {!address.isDefault && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              updateAddress.mutate({
                addressId: address._id,
                address: { isDefault: true },
              })
            }
          >
            Set as Default
          </Button>
        )}
      </div>
    </div>
  );
}
