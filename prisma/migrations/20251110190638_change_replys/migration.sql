/*
  Warnings:

  - You are about to drop the column `messageId` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `adminMessageId` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userMessageId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Reply" DROP COLUMN "messageId",
ADD COLUMN     "adminMessageId" TEXT NOT NULL,
ADD COLUMN     "userMessageId" TEXT NOT NULL;
