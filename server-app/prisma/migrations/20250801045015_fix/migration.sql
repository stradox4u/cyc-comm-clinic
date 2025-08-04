-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "calendar_event_id" TEXT;

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "has_calendar_access" BOOLEAN;
