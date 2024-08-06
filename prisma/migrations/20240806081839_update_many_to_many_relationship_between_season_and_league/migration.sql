/*
  Warnings:

  - You are about to drop the column `season_id` on the `leagues` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "leagues" DROP CONSTRAINT "leagues_season_id_fkey";

-- AlterTable
ALTER TABLE "leagues" DROP COLUMN "season_id";

-- CreateTable
CREATE TABLE "league_season" (
    "leagueId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "league_season_pkey" PRIMARY KEY ("leagueId","seasonId")
);

-- AddForeignKey
ALTER TABLE "league_season" ADD CONSTRAINT "league_season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_season" ADD CONSTRAINT "league_season_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
