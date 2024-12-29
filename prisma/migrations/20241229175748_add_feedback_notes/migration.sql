/*
  Warnings:

  - You are about to drop the column `notes` on the `InterviewStage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InterviewStage" DROP COLUMN "notes",
ADD COLUMN     "feedbackNotes" TEXT,
ADD COLUMN     "interviewNotes" TEXT;
