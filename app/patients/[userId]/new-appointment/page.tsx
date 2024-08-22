import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const NewAppoint = async ({ params: { userId } }: SearchParamProps) => {
	const patient = await getPatient(userId)
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 justify-between">
					<div className="flex gap-2 mb-12 w-fit">
						<Image src="/favicon.svg" alt="logo" height={30} width={30} />
						<h1 className="font-bold font-sans text-lg">HealthCare</h1>
					</div>
					<AppointmentForm
						type="create"
						userId={userId}
						patientId={patient.$id}
					/>
					<p className="copyright mt-10 py-12">
						© &nbsp;{new Date().getFullYear()} &nbsp;HealthCare
					</p>
				</div>
			</section>
			<Image
				className="size-img max-w-[390px] bg-bottom"
				src="/assets/images/appointment-img.png"
				width={1000}
				height={1000}
				alt="appointment"
			/>
		</div>
	)
}

export default NewAppoint
