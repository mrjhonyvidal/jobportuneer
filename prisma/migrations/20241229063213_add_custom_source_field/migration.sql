/*
  Warnings:

  - Made the column `jobSource` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "customSource" TEXT,
ALTER COLUMN "jobSource" SET NOT NULL;
