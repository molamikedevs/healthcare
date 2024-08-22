'use client'

import { ColumnDef } from '@tanstack/react-table'
import StatusBadge from '../StatusBadge'
import { formatDateTime } from '@/lib/utils'
import { Doctors } from '@/constants'
import Image from 'next/image'
import AppointmentModal from '../AppointmentModal'
import { Appointment } from '@/types/appwrite.types'

export const columns: ColumnDef<Appointment>[] = [
	{
		header: 'ID',
		cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
	},

	{
		accessorKey: 'patient',
		header: 'Patient',
		cell: ({ row }) => (
			<p className="text-14-medium">{row.original.patient.name}</p>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<div className="min-w-[115px]">
				<StatusBadge status={row.original.status} />
			</div>
		),
	},

	{
		accessorKey: 'schedule',
		header: 'Appointment',
		cell: ({ row }) => (
			<p className="text-14-regular">
				{formatDateTime(row.original.schedule).dateTime}
			</p>
		),
	},
	{
		accessorKey: 'primaryPhysician',
		header: () => 'Doctor',
		cell: ({ row }) => {
			const doctor = Doctors.find(
				doc => doc.name === row.original.primaryPhysician
			)

			return (
				<div className="flex items-center gap-3">
					<Image
						className="size-8"
						src={doctor?.image!}
						width={100}
						height={100}
						alt="doctor"
					/>
					<p className="whitespace-nowrap">{doctor?.name}</p>
				</div>
			)
		},
	},

	{
		id: 'actions',
		header: () => <div className="pl-4">Actions</div>,
		cell: ({ row: { original: data } }) => {
			return (
				<div className="flex gap-1">
					<AppointmentModal
						type="schedule"
						appointment={data}
						userId={data.userId}
						patientId={data.patient.$id}
					/>

					<AppointmentModal
						type="cancel"
						appointment={data}
						userId={data.userId}
						patientId={data.patient.$id}
					/>
				</div>
			)
		},
	},
]
