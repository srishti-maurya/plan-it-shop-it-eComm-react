import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";
import { formatDate } from "../utils/authUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MirageSchema = any;
type MirageRequest = any;

interface GoogleCredential {
  email: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  sub: string;
}

export const googleAuthHandler = function (
  this: MirageSchema,
  schema: MirageSchema,
  request: MirageRequest
) {
  const { credential } = JSON.parse(request.requestBody);

  try {
    const decoded = jwt_decode<GoogleCredential>(credential);
    const { email, given_name, family_name, name, sub: googleId } = decoded;

    const foundUser = schema.users.findBy({ email });

    if (foundUser) {
      if (!foundUser.googleId) {
        foundUser.update({ googleId });
      }

      const encodedToken = sign(
        { _id: foundUser._id, email },
        import.meta.env.VITE_JWT_SECRET
      );
      foundUser.password = undefined;
      return new Response(200, {}, { foundUser, encodedToken });
    }

    const _id = uuid();
    const firstName = given_name || name?.split(" ")[0] || "";
    const lastName = family_name || name?.split(" ").slice(1).join(" ") || "";

    const newUser = {
      _id,
      email,
      firstName,
      lastName,
      fullname: name || `${firstName} ${lastName}`.trim(),
      googleId,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      cart: [],
      wishlist: [],
      addresses: [],
      orders: [],
    };

    const createdUser = schema.users.create(newUser);
    const encodedToken = sign({ _id, email }, import.meta.env.VITE_JWT_SECRET);

    return new Response(201, {}, { createdUser, encodedToken });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error: "Failed to authenticate with Google",
      }
    );
  }
};
