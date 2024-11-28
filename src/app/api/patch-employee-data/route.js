//Api to update company name

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { apiList } from "../../../constants/api-list";

export async function PATCH(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const prisma = new PrismaClient();
  const body = await req.json();

  const { email, role } = body;

  if (apiList?.patchEmployeeData?.access?.includes(role)) {
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  try {
    await prisma.user.update({
      where: { email: email },
      data: {
        role: role,
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
