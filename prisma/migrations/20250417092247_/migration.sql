/*
  Warnings:

  - You are about to drop the column `issuse_date` on the `borrowers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "borrowers" DROP COLUMN "issuse_date",
ADD COLUMN     "issue_date" INTEGER NOT NULL DEFAULT 0;
