/*
  Warnings:

  - A unique constraint covering the columns `[appointment_id,provider_id]` on the table `appointmentproviders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointmentproviders_appointment_id_provider_id_key" ON "appointmentproviders"("appointment_id", "provider_id");
