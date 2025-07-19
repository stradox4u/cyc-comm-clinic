import logger from '../src/middlewares/logger.js'
import prisma from '../src/config/prisma.js'
import { faker } from '@faker-js/faker'
import { ProviderRoleTitle } from '@prisma/client'
import patientService from '../src/modules/patient/patient.service.js'
import providerService from '../src/modules/provider/provider.service.js'
import type { PatientRegisterSchema } from '../src/modules/auth/auth.validation.js'
import type { PatientCreateInput } from '../src/modules/patient/patient.service.js'
import type { ProviderCreateInput } from '../src/modules/provider/provider.service.js'
import bcrypt from 'bcryptjs'

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
  gender: faker.helpers.arrayElement(['Male', 'Female']),
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
  insurance_coverage: faker.datatype.boolean() ? faker.lorem.words(2) : null,
  insurance_provider_id: faker.datatype.boolean() ? faker.string.uuid() : null,
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
  gender: 'Male',
  emergency_contact_name: 'Mama Doe',
  emergency_contact_phone: '081' + faker.string.numeric(8),
  blood_group: 'A+',
  allergies: ['Chloroquine'],
  insurance_coverage: null,
  insurance_provider_id: null,
}

const customProvider: ProviderCreateInput = {
  email: 'testprovider@gmail.com',
  password: await bcrypt.hash('test1234', 10),
  first_name: 'Super',
  last_name: 'Admin',
  phone: '081' + faker.string.numeric(8),
  role: {
    create: {
      title: ProviderRoleTitle.ADMIN,
      description: 'Super admin with unrestricted access to every feature',
    },
  },
}

const seed = async () => {
  try {
    logger.info('Seeding database tables...')

    const createPatientPromises = fakePatients.map((fakePatient) => {
      patientService.createPatient(fakePatient)
    })
    await Promise.all(createPatientPromises)

    await patientService.createPatient(customPatient)
    await providerService.createProvider(customProvider)

    logger.info('Database seeded successfully!')
    await prisma.$disconnect()
    process.exit(1)
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
  }
}

seed()
