import React from 'react'
import Swal from 'sweetalert2'

import { Button } from './ui/button'
import { deleteAppointment } from '@/lib/actions/appointment.action'

interface DeleteAppointmentProps {
	appointmentId: string
	type: string // Include the type prop
}

const DeleteAppointment: React.FC<DeleteAppointmentProps> = ({
	appointmentId,
	type,
}) => {
	const handleDelete = async () => {
		if (type === 'delete') {
			Swal.fire({
				title: 'Are you sure?',
				text: 'You won’t be able to revert after deletion!',
				icon: 'warning',
				background: '#1A1D21',
				color: '#fff',
				iconColor: '#C7253E',
				showCancelButton: true,
				confirmButtonText: 'Yes, delete it!',
				cancelButtonText: 'Cancel',
				customClass: {
					confirmButton: 'confirm-btn',
					cancelButton: 'cancel-btn',
				},
				confirmButtonColor: '#C7253E',
				cancelButtonColor: '#555',
			}).then(async result => {
				if (result.isConfirmed) {
					try {
						await deleteAppointment(appointmentId)
						Swal.fire({
							text: 'Appointment deleted successfully',
							background: '#1A1D21',
							color: '#fff',
						})
					} catch (error) {
						Swal.fire('Failed!', 'Failed to delete appointment.', 'error')
						console.error('Failed to delete appointment:', error)
					}
				}
			})
		}
	}

	return (
		<Button onClick={handleDelete} className="text-white hover:text-red-800">
			Delete
		</Button>
	)
}

export default DeleteAppointment
