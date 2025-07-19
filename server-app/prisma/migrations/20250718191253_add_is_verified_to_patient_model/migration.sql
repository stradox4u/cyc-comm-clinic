/*
  Warnings:

  - You are about to drop the column `emergency_contact` on the `patients` table. All the data in the column will be lost.
  - Added the required column `emergency_contact_name` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_phone` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('VERIFY_EMAIL', 'CHANGE_PASSWORD');

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "emergency_contact",
ADD COLUMN     "emergency_contact_name" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_phone" TEXT NOT NULL,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sid_key" ON "sessions"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_email_key" ON "tokens"("email");
