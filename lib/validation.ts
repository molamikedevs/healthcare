import { z } from 'zod'

export const UserFormValidation = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	email: z.string().email('Invalid email address'),
	phone: z
		.string()
		.refine(
			phone => /^\+?[0-9\s\-]{7,15}$/.test(phone),
			'Invalid phone number'
		),
})

export const PatientFormValidation = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	email: z.string().email('Invalid email address'),
	phone: z
		.string()
		.refine(
			phone => /^\+?[0-9\s\-]{7,15}$/.test(phone),
			'Invalid phone number'
		),
	birthDate: z.coerce.date(),
	gender: z.enum(['male', 'female', 'other']),
	address: z
		.string()
		.min(5, 'Address must be at least 5 characters')
		.max(500, 'Address must be at most 500 characters'),
	occupation: z
		.string()
		.min(2, 'Occupation must be at least 2 characters')
		.max(500, 'Occupation must be at most 500 characters'),
	emergencyContactName: z
		.string()
		.min(2, 'Contact name must be at least 2 characters')
		.max(50, 'Contact name must be at most 50 characters'),
	emergencyContactNumber: z
		.string()
		.refine(
			emergencyContactNumber =>
				/^\+?[0-9\s\-]{7,15}$/.test(emergencyContactNumber),
			'Invalid phone number'
		),
	primaryPhysician: z.string().min(2, 'Select at least one doctor'),
	insuranceProvider: z
		.string()
		.min(2, 'Insurance name must be at least 2 characters')
		.max(50, 'Insurance name must be at most 50 characters'),
	insurancePolicyNumber: z
		.string()
		.min(2, 'Policy number must be at least 2 characters')
		.max(50, 'Policy number must be at most 50 characters'),
	allergies: z.string().optional(),
	currentMedication: z.string().optional(),
	familyMedicalHistory: z.string().optional(),
	pastMedicalHistory: z.string().optional(),
	identificationType: z.string().optional(),
	identificationNumber: z.string().optional(),
	identificationDocument: z.custom<File[]>().optional(),
	treatmentConsent: z
		.boolean()
		.default(false)
		.refine(value => value === true, {
			message: 'You must consent to treatment in order to proceed',
		}),
	disclosureConsent: z
		.boolean()
		.default(false)
		.refine(value => value === true, {
			message: 'You must consent to disclosure in order to proceed',
		}),
	privacyConsent: z
		.boolean()
		.default(false)
		.refine(value => value === true, {
			message: 'You must consent to privacy in order to proceed',
		}),
})

export const AppointmentFormValidation = z.object({
	primaryPhysician: z.string().min(2, 'Select at least one doctor'),
	schedule: z.coerce
		.date({
			required_error: 'Schedule date is required',
			invalid_type_error: 'Invalid date format',
		})
		.refine(date => date >= new Date(), 'Schedule date must be in the future'),
	reason: z
		.string()
		.min(5, 'Reason must be at least 5 characters')
		.max(500, 'Reason must be at most 500 characters'),
	cancellationReason: z
		.string()
		.min(5, 'Cancellation reason must be at least 5 characters')
		.max(500, 'Cancellation reason must be at most 500 characters')
		.optional(),
	note: z
		.string()
		.min(5, 'Notes must be at least 5 characters')
		.max(500, 'Note must be at most 500 characters'),
	status: z.enum(['pending', 'schedule', 'cancel'], {
		required_error: 'Status is required',
	}),
})

export const CreateAppointmentSchema = z.object({
	primaryPhysician: z.string().min(2, 'Select at least one doctor'),
	schedule: z.coerce.date(),
	reason: z
		.string()
		.min(2, 'Reason must be at least 2 characters')
		.max(500, 'Reason must be at most 500 characters'),
	note: z.string().optional(),
	cancellationReason: z.string().optional(),
})

export const ScheduleAppointmentSchema = z.object({
	primaryPhysician: z.string().min(2, 'Select at least one doctor'),
	schedule: z.coerce.date(),
	reason: z.string().optional(),
	note: z.string().optional(),
	cancellationReason: z.string().optional(),
})

export const CancelAppointmentSchema = z.object({
	primaryPhysician: z.string().min(2, 'Select at least one doctor'),
	schedule: z.coerce.date(),
	reason: z.string().optional(),
	note: z.string().optional(),
	cancellationReason: z
		.string()
		.min(2, 'Reason must be at least 2 characters')
		.max(500, 'Reason must be at most 500 characters'),
})

export function getAppointmentSchema(type: string) {
	switch (type) {
		case 'create':
			return CreateAppointmentSchema
		case 'cancel':
			return CancelAppointmentSchema
		default:
			return ScheduleAppointmentSchema
	}
}



