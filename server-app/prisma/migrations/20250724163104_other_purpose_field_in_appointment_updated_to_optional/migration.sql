/*
  Warnings:

  - A unique constraint covering the columns `[vitals_id]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "vitals_id" TEXT,
ALTER COLUMN "other_purpose" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_vitals_id_key" ON "appointments"("vitals_id");
