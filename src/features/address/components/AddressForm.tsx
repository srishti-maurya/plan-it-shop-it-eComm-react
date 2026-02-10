import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@/shared/ui";
import { useAddAddress, useUpdateAddress } from "../hooks";
import type { Address } from "@/types";

const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  isDefault: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: Address;
  onClose: () => void;
}

export function AddressForm({ address, onClose }: AddressFormProps) {
  const addAddress = useAddAddress();
  const updateAddress = useUpdateAddress();
  const isEditing = Boolean(address);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address
      ? {
          name: address.name,
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          phone: address.phone,
          isDefault: address.isDefault,
        }
      : { name: "", street: "", city: "", state: "", zipCode: "", phone: "", isDefault: false },
  });

  const onSubmit = (data: AddressFormData) => {
    if (isEditing && address) {
      updateAddress.mutate(
        { addressId: address._id, address: data },
        { onSuccess: onClose }
      );
    } else {
      addAddress.mutate(data, { onSuccess: onClose });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border bg-white p-6 shadow-sm"
    >
      <h3 className="mb-4 text-lg font-semibold">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          id="name"
          required
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Phone"
          id="phone"
          required
          error={errors.phone?.message}
          {...register("phone")}
        />
        <div className="sm:col-span-2">
          <Input
            label="Street"
            id="street"
            required
            error={errors.street?.message}
            {...register("street")}
          />
        </div>
        <Input
          label="City"
          id="city"
          required
          error={errors.city?.message}
          {...register("city")}
        />
        <Input
          label="State"
          id="state"
          required
          error={errors.state?.message}
          {...register("state")}
        />
        <Input
          label="Zip Code"
          id="zipCode"
          required
          error={errors.zipCode?.message}
          {...register("zipCode")}
        />
        <div className="flex items-center gap-2 self-end">
          <input
            type="checkbox"
            id="isDefault"
            className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
            {...register("isDefault")}
          />
          <label htmlFor="isDefault" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Button type="submit">
          {isEditing ? "Update Address" : "Add Address"}
        </Button>
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
