/*
  Warnings:

  - You are about to drop the column `customSource` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "customSource",
ADD COLUMN     "urlJobSource" TEXT;
