/*
  Warnings:

  - You are about to drop the column `season_id` on the `standings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "standings" DROP CONSTRAINT "standings_season_id_fkey";

-- AlterTable
ALTER TABLE "standings" DROP COLUMN "season_id";
