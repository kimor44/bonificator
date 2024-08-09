-- DropForeignKey
ALTER TABLE "league_season" DROP CONSTRAINT "league_season_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "league_season" DROP CONSTRAINT "league_season_seasonId_fkey";

-- AddForeignKey
ALTER TABLE "league_season" ADD CONSTRAINT "league_season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_season" ADD CONSTRAINT "league_season_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
