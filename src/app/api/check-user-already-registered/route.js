
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET(req) {
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
      return NextResponse.json({ signType: 'password' }, { status: 200 })
    }
    return NextResponse.json({ signType: '0auth' }, { status: 200 })
  }
  return NextResponse.json({ signType: 'none' }, { status: 200 })
}