/*
  Warnings:

  - The values [Vitals recorded,Vitals updated,Soap noted created,Appointment status,Appointment status updated] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `follow_up_appointment_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `follow_up_required` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `insurance_eligibility` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `timeline_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by_id` on the `soapnotes` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by_id` on the `vitals` table. All the data in the column will be lost.
  - You are about to drop the `appointment timeline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointment_schedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appointment_id]` on the table `vitals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `has_insurance` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_follow_up_required` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Made the column `other_purpose` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AppointmentPurpose" AS ENUM ('ROUTINE HEALTH CHECKUP', 'MATERNAL & CHILD HEALTH', 'IMMUNIZATIONS AND VACCINATIONS', 'FAMILY PLANNING', 'HIV AIDS COUNSELING AND TESTING', 'TUBERCULOSIS SCREENING AND TREATMENT', 'MEDICAL CONSULTATION AND TREATMENT', 'NUTRITION COUNSELING AND SUPPORT', 'CHRONIC DISEASE MANAGEMENT', 'MENTAL HEALTH SUPPORT OR COUNSELING', 'HEALTH EDUCATION AND AWARENESS', 'ANTENATAL OR POSTNATAL CARE', 'SEXUAL AND REPRODUCTIVE HEALTH SERVICES', 'MALARIA DIAGNOSIS AND TREATMENT', 'HEALTH SCREENING CAMPAIGNS', 'DRUG OR SUBSTANCE ABUSE COUNSELING', 'FOLLOWUP APPOINTMENT', 'DENTAL CARE', 'REFERRAL', 'OTHERS');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SUBMITTED', 'SCHEDULED', 'CHECKED IN', 'CANCELLED', 'RESCHEDULED', 'NO SHOW', 'COMPLETED', 'CONFIRMED');

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('VITALS RECORDED', 'SOAP NOTE RECORDED', 'SOAP NOTE UPDATED', 'APPOINTMENT STATUS CHANGED');
ALTER TABLE "events" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "appointment timeline" DROP CONSTRAINT "appointment timeline_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointment_schedule" DROP CONSTRAINT "appointment_schedule_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_follow_up_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_timeline_id_fkey";

-- DropForeignKey
ALTER TABLE "soapnotes" DROP CONSTRAINT "soapnotes_updated_by_id_fkey";

-- DropForeignKey
ALTER TABLE "vitals" DROP CONSTRAINT "vitals_updated_by_id_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "follow_up_appointment_id",
DROP COLUMN "follow_up_required",
DROP COLUMN "insurance_eligibility",
DROP COLUMN "provider_id",
DROP COLUMN "purpose",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "follow_up_id" TEXT,
ADD COLUMN     "has_insurance" BOOLEAN NOT NULL,
ADD COLUMN     "is_follow_up_required" BOOLEAN NOT NULL,
ADD COLUMN     "purposes" "AppointmentPurpose"[],
ADD COLUMN     "schedule" JSONB NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "other_purpose" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "timeline_id",
DROP COLUMN "timestamp",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "soapnotes" DROP COLUMN "updated_by_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" TEXT;

-- AlterTable
ALTER TABLE "vitals" DROP COLUMN "updated_by_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" TEXT;

-- DropTable
DROP TABLE "appointment timeline";

-- DropTable
DROP TABLE "appointment_schedule";

-- DropEnum
DROP TYPE "AppointmentPrelistedPurposes";

-- DropEnum
DROP TYPE "AppointmentTimelineStatus";

-- DropEnum
DROP TYPE "AppointmentType";

-- CreateTable
CREATE TABLE "appointmentproviders" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointmentproviders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vitals_appointment_id_key" ON "vitals"("appointment_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_follow_up_id_fkey" FOREIGN KEY ("follow_up_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointmentproviders" ADD CONSTRAINT "appointmentproviders_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointmentproviders" ADD CONSTRAINT "appointmentproviders_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soapnotes" ADD CONSTRAINT "soapnotes_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vitals" ADD CONSTRAINT "vitals_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
