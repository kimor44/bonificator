/*
  Warnings:

  - Added the required column `year` to the `standings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "standings" ADD COLUMN     "year" VARCHAR(4) NOT NULL;
