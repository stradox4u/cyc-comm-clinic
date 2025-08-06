import express from 'express';
import soapnoteController from './soapnote.controller.js';
import { authorize, authenticate, authenticateMultipleUser } from '../../middlewares/auth.js';
import { ProviderRoleTitle } from '@prisma/client';
import soapnoteValidation from './soapnote.validation.js';
import validate from '../../middlewares/validate.js';
import { UserType } from '../../types/index.js';

const router = express.Router()

router.post(
    '/record',
    authenticate(UserType.PROVIDER),
    authorize(Object.values(ProviderRoleTitle)),
    validate(soapnoteValidation.SoapNoteRecordSchema),
    soapnoteController.createSoapNote
)

router.put(
    '/update/:id',
    authenticate(UserType.PROVIDER),
    authorize(Object.values(ProviderRoleTitle)),
    soapnoteController.updateSoapNote
)

router.get(
    '/:id',
    authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
    soapnoteController.getSoapNote
)

router.get(
    '/',
    authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
    soapnoteController.getSoapNotes
)

router.delete(
    '/:id',
    authenticate(UserType.PROVIDER),
    soapnoteController.deleteSoapNote
)
export default router