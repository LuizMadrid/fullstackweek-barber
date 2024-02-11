import prisma from '../_lib/prisma';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/route';

import { Header } from '../_components/header';
import { BookingItem } from '../_components/booking-item';

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
		})
	]);

	return (
		<>
			<Header />
			<div className='px-5 py-6 md:flex md:flex-col md:flex-1'>
				<h1 className='text-2xl font-semibold'>Agendamentos</h1>

				<div className='mt-7'>
					<h2 className='text-sm text-gray-400 uppercase sm:text-base'>Confirmados</h2>

					<div className='mt-4 space-y-4'>
						{confirmedBookings.map((booking) => (
							<BookingItem key={booking.id} booking={booking} />
						))}
					</div>
				</div>

				<div className='mt-7'>
					<h2 className='text-sm text-gray-400 uppercase sm:text-base'>Finalizados</h2>

					<div className='mt-4 space-y-4'>
						{finishedBookings.map((booking) => (
							<BookingItem key={booking.id} booking={booking} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};
 
export default BookingsPage;