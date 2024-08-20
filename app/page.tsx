import { PatientForm } from '@/components/forms/PatientForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<div className="flex h-screen max-h-screen">
			{/* TODO: OTP VERIFICATION | PASS KEY */}
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<div className="flex gap-2 mb-12 w-fit">
						<Image src="/favicon.svg" alt="logo" height={30} width={30} />
						<h1 className="font-bold font-sans text-lg">HealthCare</h1>
					</div>
					<PatientForm />
					<div className="text-14-regular mt-20 flex justify-between">
						<p className="text-dark-600 justify-items-end xl:text-left">
							© &nbsp;{new Date().getFullYear()} &nbsp;HealthCare
						</p>
						<Link href="/?admin=true" className="text-green-500">
							Admin
						</Link>
					</div>
				</div>
			</section>
			<Image
				className="size-img max-w-[50%]"
				src="/assets/images/doctors.png"
				width={1000}
				height={1000}
				alt="patient"
			/>
		</div>
	)
}
