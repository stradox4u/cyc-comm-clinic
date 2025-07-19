/*
  Warnings:

  - You are about to drop the column `role_id` on the `providers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `provider_roles` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `title` on the `provider_roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `role_title` to the `providers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProviderRoleTitle" AS ENUM ('ADMIN', 'GENERAL PRACTIONER', 'NURSE', 'PHARMACIST', 'LAB TECHNICIAN', 'PAEDIATRICIAN', 'GYNAECOLOGIST', 'RECEPTIONIST');

-- DropForeignKey
ALTER TABLE "providers" DROP CONSTRAINT "providers_role_id_fkey";

-- AlterTable
ALTER TABLE "provider_roles" DROP COLUMN "title",
ADD COLUMN     "title" "ProviderRoleTitle" NOT NULL;

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "role_id",
ADD COLUMN     "role_title" "ProviderRoleTitle" NOT NULL;

-- DropEnum
DROP TYPE "RoleTitle";

-- CreateIndex
CREATE UNIQUE INDEX "provider_roles_title_key" ON "provider_roles"("title");

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_role_title_fkey" FOREIGN KEY ("role_title") REFERENCES "provider_roles"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
