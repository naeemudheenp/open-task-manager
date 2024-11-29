//Api to update company name

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  const prisma = new PrismaClient();
  const body = await req.json();

  try {
    await prisma.tasks.create({
      data: body,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error, "unable to add task");
    return NextResponse.json({}, { status: 500 });
  }
}
