import { Button } from '@/components/ui/button'
import { Doctors } from '@/constants'
import { getAppointment } from '@/lib/actions/appointment.action'
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({
	params: { userId },
	searchParams,
}: SearchParamProps) => {
	const appointmentId = (searchParams?.appointmentId as string) || ''
	const appointment = await getAppointment(appointmentId)
	const doctor = Doctors.find(doc => doc.name === appointment?.primaryPhysician)

	return (
		<div className="flex h-screen max-h-screen px-[5%]">
			<div className="success-img">
				<Link href="/">
					<div className="flex gap-2 mb-12 w-fit">
						<Image src="/favicon.svg" alt="logo" height={30} width={30} />
						<h1 className="font-bold font-sans text-lg">HealthCare</h1>
					</div>
				</Link>
				<section className="flex flex-col items-center">
					<Image
						src={'/assets/gifs/success.gif'}
						width={280}
						height={300}
						alt="success"
					/>

					<h2 className="header mb-6 max-w-[600px] text-center">
						Your <span className="text-green-500">appointment request </span>has
						been successfully submitted!
					</h2>
					<p>We wll be in touch shortly to confirm your request.</p>
				</section>

				<section className="request-details">
					<p>Request appointment details:</p>
					<div className="flex items-center gap-3">
						<Image
							className="size-8"
							src={doctor?.image!}
							alt="doctor"
							width={100}
							height={100}
						/>
						<p className="whitespace-normal">Dr. {doctor?.name}</p>
					</div>
					<div className="flex gap-3">
						<Image
							src="/assets/icons/calendar.svg"
							width={24}
							height={24}
							alt="calendar"
						/>
						<p>{formatDateTime(appointment?.schedule).dateTime}</p>
					</div>
				</section>

				<Button variant="outline" className="shad-primary-btn" asChild>
					<Link href={`/patients/${userId}/new-appointment`}>
						New Appointment
					</Link>
				</Button>
				<p className="copyright">
					© &nbsp;{new Date().getFullYear()} &nbsp;HealthCare
				</p>
			</div>
		</div>
	)
}

export default Success
