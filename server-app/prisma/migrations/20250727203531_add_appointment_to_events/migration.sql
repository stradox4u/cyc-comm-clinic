-- AlterTable
ALTER TABLE "events" ADD COLUMN     "appointment_id" TEXT;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
