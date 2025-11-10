/*
  Warnings:

  - You are about to drop the column `userChannelId` on the `Reply` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_userChannelId_fkey";

-- AlterTable
ALTER TABLE "public"."Reply" DROP COLUMN "userChannelId";
