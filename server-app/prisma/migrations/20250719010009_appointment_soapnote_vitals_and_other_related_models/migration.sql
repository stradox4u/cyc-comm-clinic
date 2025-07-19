-- CreateEnum
CREATE TYPE "AppointmentPrelistedPurposes" AS ENUM ('Routine Health Checkup', 'Maternal & Child Health', 'Immunizations And Vaccinations', 'Family Planning', 'HIV AIDS Counseling And Testing', 'Tuberculosis Screening And Treatment', 'Medical Consultation And Treatment', 'Nutrition Counseling And Support', 'Chronic Disease Management', 'Mental Health Support or Counseling', 'Health Education And Awareness', 'Antenatal or Postnatal Care', 'Sexual And Reproductive Health Services', 'Malaria Diagnosis And Treatment', 'Health Screening Campaigns', 'Drug or Substance Abuse Counseling', 'Followup Appointment', 'Dental Care', 'Referral', 'Others');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('Submitted', 'Scheduled', 'Checked in', 'Cancelled', 'Reschedule', 'No show', 'Completed', 'Confirmed');

-- CreateEnum
CREATE TYPE "AppointmentTimelineStatus" AS ENUM ('Attending', 'Attended');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Vitals recorded', 'Vitals updated', 'Soap noted created', 'Appointment status', 'Appointment status updated');

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "purpose" "AppointmentPrelistedPurposes" NOT NULL,
    "other_purpose" TEXT,
    "status" "AppointmentType" NOT NULL,
    "insurance_eligibility" BOOLEAN NOT NULL,
    "follow_up_required" BOOLEAN NOT NULL,
    "follow_up_appointment_id" TEXT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_schedule" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "appointment_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soapnotes" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "subjective" JSONB,
    "objective" JSONB,
    "assessment" JSONB,
    "plan" JSONB,
    "updated_by_id" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "soapnotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vitals" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "blood_pressure" TEXT,
    "heart_rate" TEXT,
    "temperature" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "updated_by_id" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "vitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment timeline" (
    "id" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,
    "status" "AppointmentTimelineStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointment timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "timeline_id" TEXT NOT NULL,
    "created_by_id" TEXT,
    "vitals_id" TEXT,
    "soap_note_id" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointment_schedule_appointment_id_key" ON "appointment_schedule"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "appointment timeline_appointment_id_key" ON "appointment timeline"("appointment_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_follow_up_appointment_id_fkey" FOREIGN KEY ("follow_up_appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_schedule" ADD CONSTRAINT "appointment_schedule_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soapnotes" ADD CONSTRAINT "soapnotes_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soapnotes" ADD CONSTRAINT "soapnotes_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vitals" ADD CONSTRAINT "vitals_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vitals" ADD CONSTRAINT "vitals_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment timeline" ADD CONSTRAINT "appointment timeline_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "appointment timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_vitals_id_fkey" FOREIGN KEY ("vitals_id") REFERENCES "vitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_soap_note_id_fkey" FOREIGN KEY ("soap_note_id") REFERENCES "soapnotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
