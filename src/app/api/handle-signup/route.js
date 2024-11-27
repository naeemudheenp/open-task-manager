import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function POST(req) {
  const prisma = new PrismaClient();
  const body = await req.json();
  const { email, password } = body;

  console.log(email, "emaildfdafda");

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: email,
          name: email.split("@")[0],
          role: "USER",
          password: await hashPassword(password),
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error checking or creating user: ", error);
    return NextResponse.json({ status: 503 });
  }
}
