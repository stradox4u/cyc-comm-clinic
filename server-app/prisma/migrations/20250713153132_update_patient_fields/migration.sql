/*
  Warnings:

  - You are about to drop the column `insurance` on the `patients` table. All the data in the column will be lost.
  - Added the required column `address` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `patients` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `provider_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "insurance",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "insurance_coverage" TEXT,
ADD COLUMN     "insurance_provider_id" TEXT,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "provider_roles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
