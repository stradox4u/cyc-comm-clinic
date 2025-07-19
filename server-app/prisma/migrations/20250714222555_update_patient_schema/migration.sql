/*
  Warnings:

  - You are about to drop the column `dob` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `providers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date_of_birth` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "dob",
DROP COLUMN "height",
DROP COLUMN "weight",
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "providers_email_key" ON "providers"("email");
