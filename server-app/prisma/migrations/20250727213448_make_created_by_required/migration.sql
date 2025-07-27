/*
  Warnings:

  - Made the column `created_by_id` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_created_by_id_fkey";

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "created_by_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
