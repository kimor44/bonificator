/*
  Warnings:

  - You are about to drop the column `flag` on the `leagues` table. All the data in the column will be lost.
  - Added the required column `type` to the `leagues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leagues" DROP COLUMN "flag",
ADD COLUMN     "season_id" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
