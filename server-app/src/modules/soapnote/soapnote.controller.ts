import {
  NotFoundError
} from '../../middlewares/errorHandler.js';
import type { SoapNoteRecord } from './soapnote.validation.js'
import soapnoteService from './soapnote.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { UserType } from '../../types/index.js';
import prisma from '../../config/prisma.js';
import { ProviderRoleTitle } from '@prisma/client';

const createSoapNote = catchAsync(async (req, res) => {
    const newSoapNote: SoapNoteRecord = req.body
    const provider_id = req.user?.id;
    if (!provider_id) {
        return res.status(400).json({
            success: false,
            message: "Provider ID is required to create a soap note"
        });
    }
    const savedSoapNote = await soapnoteService.createSoapNote(newSoapNote)

    res.status(201).json({
        success: true,
        data: savedSoapNote,
        message: "Soap note recorded successfully"
    })
})

const updateSoapNote = catchAsync(async (req, res) => {
    const provider_id = req.user?.id;
    const soapNoteId = req.params.id;
    const updateData = req.body;

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

    const savedSoapNote = await soapnoteService.updateSoapNote(soapNoteId, updateData)

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

interface PaginationQuery {
  page?: string;
  limit?: string;
  appointmentId?: string;
}


const getSoapNotes = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query as PaginationQuery;
  const appointmentId = query.appointmentId;

  if (!user?.id || !user.roleTitle) {
    return res.status(400).json({
      success: false,
      message: "User ID and role are required to get SOAP notes",
    });
  }

  if (appointmentId) {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: { patient_id: true, appointment_providers: { select: { provider_id: true } } },
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (user.type === UserType.PATIENT) {
      if (appointment.patient_id !== user.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
    } else if (user.type === UserType.PROVIDER) {
      const isAdminOrReceptionist =
        user.roleTitle === ProviderRoleTitle.ADMIN || user.roleTitle === ProviderRoleTitle.RECEPTIONIST;

      if (!isAdminOrReceptionist) {
        const assignedProviderIds = appointment.appointment_providers.map(p => p.provider_id);
        if (!assignedProviderIds.includes(user.id)) {
          return res.status(403).json({ success: false, message: "Access denied" });
        }
      }
    }

    const soapNotes = await soapnoteService.findSoapNotesByAppointment(appointmentId, user.id, user.roleTitle);

    if (!soapNotes || soapNotes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No SOAP notes found for this appointment",
      });
    }

    return res.status(200).json({
      success: true,
      data: soapNotes,
      message: "SOAP notes fetched successfully",
    });
  } else {
    const soapNotes = await soapnoteService.findSoapNotes(user.id, user.roleTitle);

    if (!soapNotes || soapNotes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No SOAP notes found",
      });
    }

    return res.status(200).json({
      success: true,
      data: soapNotes,
      message: "SOAP notes fetched successfully",
    });
  }
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