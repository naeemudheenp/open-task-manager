//Api to update company name

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PATCH(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const prisma = new PrismaClient();
  const body = await req.json();

  const { id, status } = body;

  try {
    await prisma.tasks.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      {
        message: "An error occurred while updating the user.",
      },
      { status: 500 }
    );
  }
}
