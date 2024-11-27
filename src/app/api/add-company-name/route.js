import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PATCH(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  const prisma = new PrismaClient();
  const body = await req.json();

  const { email, company } = body;

  if (!email || !company) {
    return NextResponse.json(
      { message: "Email and Company Name are required." },
      { status: 500 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { company: company },
    });

    return NextResponse.json(
      { message: "Company name updated successfully.", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred while updating the user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
