-- DropIndex
DROP INDEX "public"."User_chatId_key";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "chatId" DROP NOT NULL;
