-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('TAKES', 'MP', 'MOD');

-- CreateTable
CREATE TABLE "public"."Bot" (
    "id" SERIAL NOT NULL,
    "tgid" BIGINT NOT NULL,
    "confession" TEXT,
    "chatId" BIGINT,
    "channelId" BIGINT,
    "type" "public"."Type" NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bot_tgid_key" ON "public"."Bot"("tgid");
