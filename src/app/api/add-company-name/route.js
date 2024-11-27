import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const prisma = new PrismaClient();
  const body = await req.json()

  const { email, company } = body


  if (!email || !company) {
    return NextResponse.json({ message: 'Email and Company Name are required.' }, { status: 500 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { company: company },
    });

    return NextResponse.json({ message: 'Company name updated successfully.', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred while updating the user.', error: error.message }, { status: 500 });
  }
}
