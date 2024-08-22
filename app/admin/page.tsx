import StatCard from '@/components/StatCard'
import { columns } from '@/components/tables/Columns'
import { DataTable } from '@/components/tables/DataTable'

import { getAppointmentList } from '@/lib/actions/appointment.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = async () => {
	const appointments = await getAppointmentList()

	return (
		<div className="mx-auto flex flex-col space-y-14 max-w-7xl">
			<header className="admin-header">
				<Link href="/" className="cursor-pointer">
					<div className="flex gap-3">
						<Image src="/favicon.svg" alt="logo" height={30} width={30} />
						<h1 className="font-bold font-sans text-lg">HealthCare</h1>
					</div>
				</Link>
				<p className="text-16-semibold">Admin Dashboard</p>
			</header>
			<main className="admin-main">
				<section className="w-full space-y-4">
					<h1 className="header">Welcome 👋</h1>
					<p className="text-dark-700">
						Start the day by managing new appointments
					</p>
				</section>

				<section className="admin-stat">
					<StatCard
						type="appointments"
						count={appointments?.scheduledCount}
						label="Scheduled appointments"
						icon="/assets/icons/appointments.svg"
					/>

					<StatCard
						type="pending"
						count={appointments?.pendingCount}
						label="Pending appointments"
						icon="/assets/icons/pending.svg"
					/>

					<StatCard
						type="cancelled"
						count={appointments?.cancelledCount}
						label="Cancelled appointments"
						icon="/assets/icons/cancelled.svg"
					/>
				</section>

				<DataTable columns={columns} data={appointments?.documents} />
			</main>
		</div>
	)
}

export default Admin
