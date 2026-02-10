import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as addressApi from "@/services/address.api";
import { successToast } from "@/utils";
import type { Address } from "@/types";

export function useAddressQuery() {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  return useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: ({ signal }) => addressApi.getAddresses(signal),
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Omit<Address, "_id" | "createdAt" | "updatedAt">) =>
      addressApi.addAddress(address),
    onSuccess: (addresses) => {
      queryClient.setQueryData<Address[]>(["addresses"], addresses);
      successToast("Address added");
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      addressId,
      address,
    }: {
      addressId: string;
      address: Partial<Address>;
    }) => addressApi.updateAddress(addressId, address),
    onSuccess: (addresses) => {
      queryClient.setQueryData<Address[]>(["addresses"], addresses);
      successToast("Address updated");
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => addressApi.deleteAddress(addressId),
    onSuccess: (addresses) => {
      queryClient.setQueryData<Address[]>(["addresses"], addresses);
      successToast("Address deleted");
    },
  });
}
