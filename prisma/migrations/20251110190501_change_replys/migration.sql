/*
  Warnings:

  - You are about to drop the column `channelId` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `takeId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_channelId_fkey";

-- AlterTable
ALTER TABLE "public"."Reply" DROP COLUMN "channelId",
ADD COLUMN     "takeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_takeId_fkey" FOREIGN KEY ("takeId") REFERENCES "public"."Take"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
