import { RegisterForm } from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId)

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container">
				<div className="sub-container max-w-[860px] flex-1 flex-col py-10">
					<div className="flex gap-2 mb-12 w-fit">
						<Image src="/favicon.svg" alt="logo" height={30} width={30} />
						<h1 className="font-bold font-sans text-lg">HealthCare</h1>
					</div>
					<RegisterForm user={user} />
					<p className="copyright py-12">
						© &nbsp;{new Date().getFullYear()} &nbsp;HealthCare
					</p>
				</div>
			</section>
			<Image
				className="size-img max-w-[390px]"
				src="/assets/images/register-img.png"
				width={1000}
				height={1000}
				alt="patient"
			/>
		</div>
	)
}

export default Register
