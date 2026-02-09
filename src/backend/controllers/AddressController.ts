import { Response } from "miragejs";
import { v4 as uuid } from "uuid";
import { formatDate, requiresAuth } from "../utils/authUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

export const getAddressesHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
  }
  const user = schema.users.findBy({ _id: userId });
  return new Response(200, {}, { addresses: user.addresses ?? [] });
};

export const addAddressHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
    }
    const user = schema.users.findBy({ _id: userId });
    const addresses = user.addresses ?? [];
    const { address } = JSON.parse(request.requestBody);
    const newAddress = {
      ...address,
      _id: uuid(),
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    if (newAddress.isDefault) {
      addresses.forEach((a: { isDefault: boolean }) => { a.isDefault = false; });
    }
    addresses.push(newAddress);
    this.db.users.update({ _id: userId }, { addresses });
    return new Response(201, {}, { addresses });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const updateAddressHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
    }
    const user = schema.users.findBy({ _id: userId });
    const addresses = user.addresses ?? [];
    const addressId = request.params.addressId;
    const { address } = JSON.parse(request.requestBody);
    if (address.isDefault) {
      addresses.forEach((a: { isDefault: boolean }) => { a.isDefault = false; });
    }
    const idx = addresses.findIndex((a: { _id: string }) => a._id === addressId);
    if (idx === -1) {
      return new Response(404, {}, { errors: ["Address not found"] });
    }
    addresses[idx] = { ...addresses[idx], ...address, updatedAt: formatDate() };
    this.db.users.update({ _id: userId }, { addresses });
    return new Response(200, {}, { addresses });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const deleteAddressHandler = function (this: MirageSchema, schema: MirageSchema, request: MirageRequest) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(404, {}, { errors: ["The email you entered is not Registered. Not Found error"] });
    }
    const user = schema.users.findBy({ _id: userId });
    const addresses = (user.addresses ?? []).filter(
      (a: { _id: string }) => a._id !== request.params.addressId
    );
    this.db.users.update({ _id: userId }, { addresses });
    return new Response(200, {}, { addresses });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};
