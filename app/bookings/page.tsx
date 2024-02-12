import prisma from '../_lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

import { Header } from '../_components/header';
import { BookingsSheet } from './_components/booking-list';

const BookingsPage = async () => {

	const session = await getServerSession(authOptions);

	const [confirmedBookings, finishedBookings] = await Promise.all([
		prisma.booking.findMany({
			where: {
				userId: (session?.user as any).id,
				date: {
					gte: new Date(),
				},
			},
			include: {
				service: true,
				barbershop: true,
			},
		}),
		
		prisma.booking.findMany({
			where: {
				userId: (session?.user as any).id,
				date: {
					lt: new Date(),
				},
			},
			include: {
				service: true,
				barbershop: true,
			},
		}),
	]);

	return (
		<>
			<Header />
			<div className='px-5 py-6 h-[calc(100vh-222px)] md:flex md:flex-col lg:px-32'>
				<h1 className='text-2xl font-semibold'>Agendamentos</h1>

				{confirmedBookings.length === 0 && finishedBookings.length === 0 ? (
					<p className='text-center mt-5 uppercase text-gray-400 text-lg font-semibold tracking-wide'>Você não possui agendamentos confirmado nem finalizado.</p>
				) : (
					<>
						{confirmedBookings.length === 0 ? (
							<p className='text-center mt-5 uppercase text-gray-400 text-lg font-semibold tracking-wide'>Você não possui agendamentos confirmados.</p>
						) : (
							<BookingsSheet bookings={confirmedBookings} title='Confirmados' />
						)}

						{finishedBookings.length === 0 ? (
							<p className='text-center mt-5 uppercase text-gray-400 text-lg font-semibold tracking-wide'>Você não possui agendamentos finalizados.</p>
						) : (
							<BookingsSheet bookings={finishedBookings} title='Finalizados' />
						)}
					</>
				)}

			</div>
		</>
	);
};
 
export default BookingsPage;