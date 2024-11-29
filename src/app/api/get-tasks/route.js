import { NextResponse } from "next/server";
import { isAuthorised } from "../../../helpers/isAuthorised";
import { PrismaClient } from "@prisma/client";

export async function GET(req) {
  const allowed = await isAuthorised(req);
  const prisma = new PrismaClient();
  if (allowed) {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get("company");
    const data = await prisma.tasks.findMany({
      where: {
        company: company,
      },
    });
    return NextResponse.json(data, { status: 200 });
  }
  return NextResponse.json("Unauthorized", { status: 401 });
}
