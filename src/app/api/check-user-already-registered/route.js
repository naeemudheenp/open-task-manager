
//Checking is the user already registered or not , also login type.
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { signInTypes } from "@/constants"
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    if (existingUser.password) {
      return NextResponse.json({ signType: signInTypes.password }, { status: 200 })
    }
    return NextResponse.json({ signType: signInTypes.zeroAuth }, { status: 200 })
  }
  return NextResponse.json({ signType: signInTypes.none }, { status: 200 })
}