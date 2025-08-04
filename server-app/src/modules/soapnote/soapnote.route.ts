import express from 'express';
import soapnoteController from './soapnote.controller.js';
import { authorize, authenticate, authenticateMultipleUser } from '../../middlewares/auth.js';
import { PROVIDER_ROLES } from '../../types/index.js';
import soapnoteValidation from './soapnote.validation.js';
import validate from '../../middlewares/validate.js';
import { UserType } from '../../types/index.js';

const router = express.Router()

router.post(
    '/record',
    authenticate(UserType.PROVIDER),
    authorize(PROVIDER_ROLES),
    validate(soapnoteValidation.SoapNoteRecordSchema),
    soapnoteController.createSoapNote
)

router.put(
    '/update',
    authenticate(UserType.PROVIDER),
    authorize(PROVIDER_ROLES),
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