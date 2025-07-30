import logger from '../src/middlewares/logger.js'
import prisma from '../src/config/prisma.js'
import { faker } from '@faker-js/faker'
import { Prisma, ProviderRoleTitle } from '@prisma/client'
import patientService from '../src/modules/patient/patient.service.js'
import providerService from '../src/modules/provider/provider.service.js'
import type { PatientRegisterSchema } from '../src/modules/auth/auth.validation.js'
import type { ProviderCreateInput } from '../src/modules/provider/provider.service.js'
import bcrypt from 'bcryptjs'

export type PatientCreateInput = Prisma.PatientCreateInput
export type ProviderRoleCreateInput = Prisma.ProviderRoleCreateInput

const createRandomPatient = (): PatientRegisterSchema => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 }),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  phone: '081' + faker.string.numeric(8),
  date_of_birth: faker.date
    .birthdate({ min: 1950, max: 2010, mode: 'year' })
    .toISOString(),
  address: faker.location.streetAddress(),
  gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
  emergency_contact_name: faker.person.fullName(),
  emergency_contact_phone: '081' + faker.string.numeric(8),
  blood_group: faker.helpers.arrayElement([
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ]),
  allergies: faker.helpers.arrayElements(
    ['Pollen', 'Dust', 'Peanuts', 'Shellfish', 'Milk', 'Eggs', 'Latex'],
    { min: 0, max: 3 }
  ),
  insurance_coverage: null,
  insurance_provider_id: null,
})

const fakePatients = faker.helpers.multiple(createRandomPatient, {
  count: 30,
})

const customPatient: PatientCreateInput = {
  email: 'testpatient@gmail.com',
  password: await bcrypt.hash('test1234', 10),
  is_verified: true,
  first_name: 'John',
  last_name: 'Doe',
  phone: '081' + faker.string.numeric(8),
  date_of_birth: '1990-07-13T14:45:00.000Z',
  address: 'No 99, West Rock street, Abeokuta, Ogun State, Nigeria',
  gender: 'MALE',
  emergency_contact_name: 'Mama Doe',
  emergency_contact_phone: '081' + faker.string.numeric(8),
  blood_group: 'A+',
  allergies: ['Chloroquine'],
  insurance_coverage: 'Basic Health Package',
  insurance_provider: {
    create: {
      name: 'Leads Insurance Coporation',
      description:
        'Providing the best in insurance package for all your health care needs. Your Number one most trusted insurance provider',
    },
  },
}

const customProvider: ProviderCreateInput = {
  email: 'testprovider@gmail.com',
  password: await bcrypt.hash('test1234', 10),
  first_name: 'Super',
  last_name: 'Admin',
  phone: '081' + faker.string.numeric(8),
  role: { connect: { title: 'ADMIN' } },
}

const providerRoles: ProviderRoleCreateInput[] = [
  {
    title: ProviderRoleTitle.ADMIN,
    description: 'Super admin with unrestricted access to every feature',
  },
  {
    title: ProviderRoleTitle.GENERAL_PRACTIONER,
    description: 'Provides primary and preventive healthcare services',
  },
  {
    title: ProviderRoleTitle.GYNAECOLOGIST,
    description: "Specializes in women's reproductive health",
  },
  {
    title: ProviderRoleTitle.LAB_TECHNICIAN,
    description: 'Conducts diagnostic tests and analyzes lab samples',
  },
  {
    title: ProviderRoleTitle.NURSE,
    description: 'Offers patient care and clinical support',
  },
  {
    title: ProviderRoleTitle.PAEDIATRICIAN,
    description: 'Treats and monitors the health of children',
  },
  {
    title: ProviderRoleTitle.PHARMACIST,
    description: 'Dispenses medications and advises on drug use',
  },
  {
    title: ProviderRoleTitle.RECEPTIONIST,
    description: 'Manages front-desk operations and patient scheduling',
  },
]

const seed = async () => {
  try {
    logger.info('Seeding database tables...')

    await Promise.all([
      prisma.patient.createMany({ data: fakePatients }),
      prisma.patient.create({ data: customPatient }),
      prisma.providerRole.createMany({ data: providerRoles }),
    ])
    await prisma.provider.create({ data: customProvider }),
      logger.info('Database seeded successfully!')
    await prisma.$disconnect()
    process.exit(1)
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
  }
}

seed()
