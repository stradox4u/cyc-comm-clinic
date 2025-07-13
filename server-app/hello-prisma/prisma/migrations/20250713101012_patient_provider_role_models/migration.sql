-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'PATIENT', 'HEALTHCARE_PROVIDER');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('GENERAL_PRACTITIONER', 'NURSE', 'PHARMACIST', 'GYNAECOLOGIST', 'RECEPTIONIST');

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user" "UserRole" NOT NULL DEFAULT 'PATIENT',

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "title" "Title" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Healthcare_Provider" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user" "UserRole" NOT NULL DEFAULT 'HEALTHCARE_PROVIDER',
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Healthcare_Provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Healthcare_Provider_email_key" ON "Healthcare_Provider"("email");

-- AddForeignKey
ALTER TABLE "Healthcare_Provider" ADD CONSTRAINT "Healthcare_Provider_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
