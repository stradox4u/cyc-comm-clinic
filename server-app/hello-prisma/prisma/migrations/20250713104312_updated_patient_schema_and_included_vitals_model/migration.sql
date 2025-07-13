-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "address" TEXT,
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "blood_group" TEXT,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "weight" TEXT;

-- CreateTable
CREATE TABLE "Vitals" (
    "id" SERIAL NOT NULL,
    "blood_pressure" TEXT,
    "temperature" TEXT,
    "heart_rate" TEXT,
    "soapNote" JSONB,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Vitals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
