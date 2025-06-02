/*
  Warnings:

  - Added the required column `userId` to the `ResumeQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumeQuestion" DROP CONSTRAINT "ResumeQuestion_resumeId_fkey";

-- AlterTable
ALTER TABLE "ResumeQuestion" ADD COLUMN     "userId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "ResumeQuestion" ADD CONSTRAINT "ResumeQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
