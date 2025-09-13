/*
  Warnings:

  - You are about to drop the column `chatId` on the `Bot` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Bot` table. All the data in the column will be lost.
  - You are about to drop the column `confession` on the `Bot` table. All the data in the column will be lost.
  - The `channelId` column on the `Bot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tgid,type]` on the table `Bot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('MEMBER', 'BANNED', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."TakeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropIndex
DROP INDEX "public"."Bot_tgid_key";

-- AlterTable
ALTER TABLE "public"."Bot" DROP COLUMN "chatId",
DROP COLUMN "code",
DROP COLUMN "confession",
DROP COLUMN "channelId",
ADD COLUMN     "channelId" INTEGER,
ADD CONSTRAINT "Bot_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."Channel" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "channelId" TEXT,
    "adminChatId" TEXT,
    "discussionChatId" TEXT,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "tgid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserChannel" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "UserChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Take" (
    "id" SERIAL NOT NULL,
    "status" "public"."TakeStatus" NOT NULL DEFAULT 'PENDING',
    "messageId" TEXT NOT NULL,
    "userChannelId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "Take_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_code_key" ON "public"."Channel"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_tgid_key" ON "public"."User"("tgid");

-- CreateIndex
CREATE UNIQUE INDEX "UserChannel_userId_channelId_key" ON "public"."UserChannel"("userId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Bot_tgid_type_key" ON "public"."Bot"("tgid", "type");

-- AddForeignKey
ALTER TABLE "public"."Bot" ADD CONSTRAINT "Bot_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserChannel" ADD CONSTRAINT "UserChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserChannel" ADD CONSTRAINT "UserChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Take" ADD CONSTRAINT "Take_userChannelId_fkey" FOREIGN KEY ("userChannelId") REFERENCES "public"."UserChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Take" ADD CONSTRAINT "Take_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
