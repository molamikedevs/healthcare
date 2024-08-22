'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { PatientFormValidation, UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { registerPatient } from '@/lib/actions/patient.actions'
import { FormFieldType } from './PatientForm'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
	Doctors,
	GenderOptions,
	IdentificationTypes,
	PatientFormDefaultValues,
} from '@/constants'
import { Label } from '../ui/label'
import { SelectItem } from '@/components/ui/select'
import Image from 'next/image'
import FileUploader from '../FileUploader'

export function RegisterForm({ user }: { user: User }) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: {
			...PatientFormDefaultValues,
			name: '',
			email: '',
			phone: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
		setIsLoading(true)

		// Store file info in form data as
		let formData
		if (
			values.identificationDocument &&
			values.identificationDocument?.length > 0
		) {
			const blobFile = new Blob([values.identificationDocument[0]], {
				type: values.identificationDocument[0].type,
			})

			formData = new FormData()
			formData.append('blobFile', blobFile)
			formData.append('fileName', values.identificationDocument[0].name)
		}

		try {
			const patient = {
				...values,
				userId: user.$id,
				birthDate: new Date(values.birthDate),
				identificationDocument: formData,
			}
			//@ts-ignore
			const newPatient = await registerPatient(patient)

			if (newPatient) {
				router.push(`/patients/${user.$id}/new-appointment`)
			}
		} catch (error) {
			console.log(error)
		}

		setIsLoading(false)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-12 flex-1">
				<section className="space-y-4">
					<h1 className="header">Welcome 👋</h1>
					<p className="text-dark-700">Let us know about yourself.</p>
				</section>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="header">Personal Information</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					placeholder="Aygün Kazımova"
					name="name"
					label="Full Name"
					iconSrc="/assets/icons/user.svg"
					iconAlt="user"
				/>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						placeholder="molamikedevs@gmail.com"
						name="email"
						label="Email"
						iconSrc="/assets/icons/email.svg"
						iconAlt="email"
					/>

					<CustomFormField
						fieldType={FormFieldType.PHONE_INPUT}
						control={form.control}
						placeholder="(+994) 705 700 992"
						name="phone"
						label="Phone Number"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.DATE_PICKER}
						control={form.control}
						name="birthDate"
						label="Date of Birth"
					/>

					<CustomFormField
						fieldType={FormFieldType.SKELETON}
						control={form.control}
						name="gender"
						label="Gender"
						renderSkeleton={field => (
							<FormControl>
								<RadioGroup
									className="flex h-11 gap-6 xl:justify-between"
									onValueChange={field.onChange}
									defaultValue={field.value}>
									{GenderOptions.map((option, i) => (
										<div key={option + i} className="radio-group">
											<RadioGroupItem value={option} id={option} />
											<Label htmlFor={option} className="cursor-pointer">
												{option}
											</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
						)}
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						placeholder="Baku"
						name="address"
						label="Address"
					/>

					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						placeholder="Programmer"
						name="occupation"
						label="Occupation"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						placeholder="Guardian's Name"
						name="emergencyContactName"
						label="Emergency Contact Name"
					/>

					<CustomFormField
						fieldType={FormFieldType.PHONE_INPUT}
						control={form.control}
						placeholder="(+994) 705 700 992"
						name="emergencyContactNumber"
						label="Emergency Contact Number"
					/>
				</div>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="header">Medical Information</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.SELECT}
					control={form.control}
					name="primaryPhysician"
					label="Primary care physician"
					placeholder="Select a physician">
					{Doctors.map((doctor, i) => (
						<SelectItem
							key={doctor.name + i}
							value={doctor.name}
							className="cursor-pointer">
							<div className="flex cursor-pointer items-center gap-2">
								<Image
									src={doctor.image}
									width={32}
									height={32}
									alt="doctor"
									className="rounded-full border border-dark-500"
								/>
								<p>{doctor.name}</p>
							</div>
						</SelectItem>
					))}
				</CustomFormField>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						placeholder="AIC INSURANCE COMPANY"
						name="insuranceProvider"
						label="Insurance"
					/>

					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						placeholder="ABCE123D54"
						name="insurancePolicyNumber"
						label="Insurance Policy Number"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						placeholder="Nuts, Meat, Junk Food, etc"
						name="allergies"
						label="Allergies (if any)"
					/>

					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						placeholder="Paracetamol, Amoxicillin, Naproxen, Tramadol"
						name="currentMedication"
						label="Current Medication"
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						placeholder="Headache, stomachache, etc"
						name="familyMedicalHistory"
						label="Family Medical History"
					/>

					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						placeholder="Toothache, etc"
						name="pastMedicalHistory"
						label="Past Medical History"
					/>
				</div>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="header">Identification & Verification</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.SELECT}
					control={form.control}
					name="identificationType"
					label="Identification Type"
					placeholder="Select identification type">
					{IdentificationTypes.map((type, i) => (
						<SelectItem key={type} value={type} className="cursor-pointer">
							{type}
						</SelectItem>
					))}
				</CustomFormField>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					placeholder="1234567890"
					name="identification"
					label="Identification Number"
				/>

				<CustomFormField
					fieldType={FormFieldType.SKELETON}
					control={form.control}
					name="identificationDocument"
					label="Scanned Copy of Identification Document"
					renderSkeleton={field => (
						<FormControl>
							<FileUploader files={field.value} onChange={field.onChange} />
						</FormControl>
					)}
				/>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">Consent and Privacy</h2>
					</div>

					<CustomFormField
						fieldType={FormFieldType.CHECKBOX}
						control={form.control}
						name="treatmentConsent"
						label="I consent to receive treatment for my health condition."
					/>

					<CustomFormField
						fieldType={FormFieldType.CHECKBOX}
						control={form.control}
						name="disclosureConsent"
						label="I consent to the use and disclosure of my health
                                information for treatment purposes."
					/>

					<CustomFormField
						fieldType={FormFieldType.CHECKBOX}
						control={form.control}
						name="privacyConsent"
						label="I acknowledge that I have reviewed and agree to the
                                privacy policy"
					/>
				</section>

				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	)
}
