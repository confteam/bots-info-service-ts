/*
  Warnings:

  - Added the required column `role` to the `UserChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "public"."UserChannel" DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL;
