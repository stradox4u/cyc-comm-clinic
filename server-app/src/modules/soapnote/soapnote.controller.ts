import {
  NotFoundError,
  ValidationError,
} from '../../middlewares/errorHandler.js';
import type { SoapNoteRecord } from './soapnote.validation.js'
import soapnoteService from './soapnote.service.js';
import catchAsync from '../../utils/catchAsync.js';

const createSoapNote = catchAsync(async (req, res) => {
    const newSoapNote: SoapNoteRecord = req.body
    const provider_id = req.user?.id;
    if (!provider_id) {
        return res.status(400).json({
            success: false,
            message: "Provider ID is required to create a soap note"
        });
    }
    const savedSoapNote = await soapnoteService.createSoapNote(newSoapNote, provider_id)

    res.status(201).json({
        success: true,
        data: savedSoapNote,
        message: "Soap note recorded successfully"
    })
})

const updateSoapNote = catchAsync(async (req, res) => {
    const provider_id = req.user?.id;
    const soapNoteId = req.params.id;

    if (!provider_id) {
        return res.status(400).json({
            success: false,
            message: "Provider ID is required to update a soap note"
        });
    }

    const soapNote = await soapnoteService.findSoapNote(soapNoteId)

    if (!soapNote) {
        throw new NotFoundError('Soapnote not found');
    }

    const savedSoapNote = await soapnoteService.updateSoapNote(soapNote, provider_id)

    res.status(201).json({
        success: true,
        data: savedSoapNote,
        message: "Soap note recorded successfully"
    })
})

const getSoapNote = catchAsync(async (req, res) => {
    const user_id = req.user?.id;
    const soapNoteId = req.params.id;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: "User ID is required to get a soap note"
        });
    }

    const soapNote = await soapnoteService.findSoapNote(soapNoteId)
    if (!soapNote) {
        return res.status(404).json({
            success: false,
            message: "Soap note not found"
        });
    }

    res.status(201).json({
        success: true,
        data: soapNote,
        message: "Soap note fetched successfully"
    })
})

const getSoapNotes = catchAsync(async (req, res) => {
    const user_id = req.user?.id;
    const role = req.user?.roleTitle;

    if (!user_id || !role) {
        return res.status(400).json({
            success: false,
            message: "User ID and role are required to get SOAP notes"
        });
    }

    const soapNotes = await soapnoteService.findSoapNotes(user_id, role);

    if (!soapNotes || soapNotes.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No SOAP notes found"
        });
    }

    res.status(200).json({
        success: true,
        data: soapNotes,
        message: "SOAP notes fetched successfully"
    });
});


const deleteSoapNote = catchAsync(async (req, res) => {
  const soapNoteId = req.params.id;
  const userId = req.user?.id;
  const role = req.user?.roleTitle;

  if (!soapNoteId) {
    return res.status(400).json({
      success: false,
      message: "SOAP note ID is required",
    });
  }

  if (!userId || !role) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User ID or role is missing",
    });
  }

  const result = await soapnoteService.deleteSoapNote(soapNoteId, userId, role);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});


export default {
    createSoapNote,
    updateSoapNote,
    getSoapNote,
    deleteSoapNote,
    getSoapNotes
}