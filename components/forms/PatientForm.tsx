'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'

export enum FormFieldType {
	INPUT = 'input',
	TEXTAREA = 'textarea',
	PHONE_INPUT = 'phoneInput',
	CHECKBOX = 'checkbox',
	DATE_PICKER = 'datePicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

export function PatientForm() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	})

	const onSubmit = async ({
		email,
		phone,
		name,
	}: z.infer<typeof UserFormValidation>) => {
		setIsLoading(true)

		try {
			const user = { name, email, phone }

			const newUser = await createUser(user)

			if (newUser) {
				router.push(`/patients/${newUser.$id}/register`)
			}
		} catch (error) {
			console.log(error)
		}

		setIsLoading(false)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Salam 👋</h1>
					<p className="text-dark-700">Schedule your first appointment.</p>
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

				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	)
}
