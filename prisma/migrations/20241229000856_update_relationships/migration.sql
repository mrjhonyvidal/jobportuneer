-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_jobId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewStage" DROP CONSTRAINT "InterviewStage_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_interviewStageId_fkey";

-- DropForeignKey
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "interviewStages" INTEGER;
