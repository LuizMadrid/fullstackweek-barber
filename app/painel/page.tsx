import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

import prisma from '../_lib/prisma';

import { DropdownMenu } from '../_components/dropdown-menu';
import { TodayBookingUser } from './_components/today-booking-user';
import { UserBarbershops } from './_components/user-barbershops';
import { HamburgerMenuPainel } from './_components/hamburger-menu-painel';

const page = async () => {

	const session = await getServerSession(authOptions);

	const [barbershops, bookings] = await Promise.all([
		prisma.barbershop.findMany({
			where: {
				userId: (session?.user as any).id,
			},
			include: {
				user: true,
				bookings: {
					include: {
						user: true,
					},
				}
			},
		}),
		prisma.booking.findMany({
			where: {
				barbershop: {
					user: {
						id: (session?.user as any).id
					}
				}
			},
			include: {
				user: true,
				service: true,
				barbershop: true
			}
		})
	]);
	
	const todaysBookings = bookings.filter(booking => {
		const bookingDate = new Date(booking.date); 
		const today = new Date(); 
		return ( 
			bookingDate.getDate() === today.getDate() && 
			bookingDate.getMonth() === today.getMonth() && 
			bookingDate.getFullYear() === today.getFullYear() 
		);
	});
	
	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between py-5 mx-5 border-b border-secondary'>
				<div className='space-y-2'>
					<h1 className='text-2xl font-bold'>Seu Painel</h1>
					<p className='text-sm text-gray-400'>Gerencie suas barbearias e agendamentos</p>
				</div>
				
				<div className='2sm:hidden'>
					<HamburgerMenuPainel />
				</div>
				
				<div className='hidden 2sm:flex'>
					<DropdownMenu />
				</div>
			</div>

			<div className='p-5'>
				<div className='flex flex-col space-y-8'>
					<div className='relative space-y-2'>
						<h1 className='text-lg font-bold tracking-wide text-gray-400 capitalize'>Suas barbearias</h1>

						<div className='flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
							{barbershops.map((barbershop) => (
								<div key={barbershop.id}  className='min-w-48 sm:min-w-60'>
									<UserBarbershops barbershop={barbershop as any} />
								</div>
							))}
						</div>
					</div>

					<div className='relative space-y-2'>
						<h1 className='text-lg font-bold tracking-wide text-gray-400 capitalize'>Agendados Hoje</h1>

						<div className='grid grid-flow-col gap-4 w-fit'>
							{todaysBookings.map((booking) => (
								<div key={booking.id}>
									<TodayBookingUser bookings={booking as any} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;