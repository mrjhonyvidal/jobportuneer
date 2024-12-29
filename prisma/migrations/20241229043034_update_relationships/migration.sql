/*
  Warnings:

  - You are about to drop the column `customPreferences` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `remindBeforeInterview` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `reminderType` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `deliveryMethod` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Preference_clerkId_key";

-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "customPreferences",
DROP COLUMN "remindBeforeInterview",
ADD COLUMN     "jobApplicationDeadlineDays" INTEGER,
ADD COLUMN     "newJobMatches" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "remindBeforeInterviewDays" INTEGER,
ALTER COLUMN "followUpFrequencyDays" DROP NOT NULL,
ALTER COLUMN "followUpFrequencyDays" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "reminderType",
DROP COLUMN "title",
ADD COLUMN     "deliveryMethod" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "NotificationChannel" (
    "id" TEXT NOT NULL,
    "preferenceId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NotificationChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferenceChangeLog" (
    "id" TEXT NOT NULL,
    "preferenceId" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreferenceChangeLog_pkey" PRIMARY KEY ("id")
);
