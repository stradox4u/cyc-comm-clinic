/*
  Warnings:

  - A unique constraint covering the columns `[vitals_id]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
/*ALTER TABLE "appointments" ADD COLUMN     "vitals_id" TEXT;*/

-- CreateTable
CREATE TABLE "InsuranceProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "InsuranceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
/*CREATE UNIQUE INDEX "appointments_vitals_id_key" ON "appointments"("vitals_id");*/

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_insurance_provider_id_fkey" FOREIGN KEY ("insurance_provider_id") REFERENCES "InsuranceProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
