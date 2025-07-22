/*
  Warnings:

  - The values [Male,Female] on the enum `PatientGender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PatientGender_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "patients" ALTER COLUMN "gender" TYPE "PatientGender_new" USING ("gender"::text::"PatientGender_new");
ALTER TYPE "PatientGender" RENAME TO "PatientGender_old";
ALTER TYPE "PatientGender_new" RENAME TO "PatientGender";
DROP TYPE "PatientGender_old";
COMMIT;

-- DropIndex
DROP INDEX "patients_phone_key";
