/*
  Warnings:

  - Added the required column `book_name` to the `borrowers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "borrowers" ADD COLUMN     "book_name" TEXT NOT NULL;
