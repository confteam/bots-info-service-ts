/*
  Warnings:

  - You are about to drop the column `channelId` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Channel" DROP COLUMN "channelId",
ADD COLUMN     "channelChatId" TEXT;
