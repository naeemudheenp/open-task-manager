-- CreateEnum
CREATE TYPE "Department" AS ENUM ('HR', 'ENGINEERING', 'ACCOUNTS', 'UNASSIGNED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" "Department" DEFAULT 'UNASSIGNED';
