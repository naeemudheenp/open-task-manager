//Api to update company name

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function DELETE(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const prisma = new PrismaClient();

  const { email } = params;

  try {
    await prisma.user.delete({
      where: { email: email },
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
