import { api } from "./api";
import type { Address } from "@/types";

export async function getAddresses(): Promise<Address[]> {
  const { data } = await api.get("/user/addresses");
  return data.addresses;
}

export async function addAddress(
  address: Omit<Address, "_id" | "createdAt" | "updatedAt">
): Promise<Address[]> {
  const { data } = await api.post("/user/addresses", { address });
  return data.addresses;
}

export async function updateAddress(
  addressId: string,
  address: Partial<Address>
): Promise<Address[]> {
  const { data } = await api.post(`/user/addresses/${addressId}`, { address });
  return data.addresses;
}

export async function deleteAddress(addressId: string): Promise<Address[]> {
  const { data } = await api.delete(`/user/addresses/${addressId}`);
  return data.addresses;
}
