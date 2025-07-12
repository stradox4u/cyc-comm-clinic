-- CreateEnum
CREATE TYPE "PatientGender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "RoleTitle" AS ENUM ('ADMIN', 'GENERAL PRACTIONER', 'NURSE', 'PHARMACIST', 'LAB TECHNICIAN', 'PAEDIATRICIAN', 'GYNAECOLOGIST', 'RECEPTIONIST');

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "gender" "PatientGender" NOT NULL,
    "emergency_contact" TEXT NOT NULL,
    "blood_group" TEXT NOT NULL,
    "allergies" TEXT[],
    "insurance" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_roles" (
    "id" TEXT NOT NULL,
    "title" "RoleTitle" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "provider_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_phone_key" ON "patients"("phone");

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "provider_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
