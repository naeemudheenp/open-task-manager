import { getToken } from "next-auth/jwt";

export async function isAuthorised(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    return true
  }
  return false
}