-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'Running', 'DONE');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
