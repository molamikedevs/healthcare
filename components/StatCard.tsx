import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface StatCardProps {
	type: 'appointments' | 'pending' | 'cancelled'
	count: number
	label: string
	icon: string
}
const StatCard = ({ label, count = 0, type, icon }: StatCardProps) => {
	return (
		<div
			className={clsx('stat-card', {
				'bg-appointments': type === 'appointments',
				'bg-pending': type === 'pending',
				'bg-cancelled': type === 'cancelled',
			})}>
			<div className="flex items-center gap-4">
				<Image
					className="size-8 w-fit"
					src={icon}
					alt="icon"
					width={32}
					height={32}
				/>
				<h1 className="text-32-bold text-white">{count}</h1>
			</div>
			<p className="text-14-regular">{label}</p>
		</div>
	)
}

export default StatCard
