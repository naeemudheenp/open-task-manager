/*
  Warnings:

  - Added the required column `company` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "department" "Department" DEFAULT 'UNASSIGNED';
