import { Response } from "miragejs";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

export const requiresAuth = function (this: { db: { users: { findBy: (query: Record<string, string>) => { _id: string; email: string } | null } } }, request: { requestHeaders: { authorization: string } }) {
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode<{ _id: string; email: string }>(
    encodedToken
  );
  if (decodedToken) {
    const user = this.db.users.findBy({ email: decodedToken.email });
    if (user) {
      return user._id;
    }
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};

export const formatDate = (): string => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
