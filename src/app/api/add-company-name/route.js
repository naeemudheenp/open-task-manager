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
  const { email, company } = body;

  if (!email || !company) {
    return NextResponse.json(
      { message: "Email and Company Name are required." },
      { status: 500 }
    );
  }

  let isCompanyExist = await prisma.user.findFirst({
    where: { company: company },
  });

  try {
    await prisma.user.update({
      where: { email: email },
      data: {
        company: company,
        role: !isCompanyExist ? "ADMIN" : "USER", //Assigning admin role if the first user of the company.
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error, "unable to add company");
    return NextResponse.json(
      {
        message: "An error occurred while updating.",
      },
      { status: 500 }
    );
  }
}
