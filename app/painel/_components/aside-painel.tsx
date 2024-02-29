import prisma from '@/app/_lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';

import { CalendarDays, LayoutPanelLeft, Newspaper, TimerReset } from 'lucide-react';

import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';

export const AsidePainel = async () => {

	const session = await getServerSession(authOptions);

	const barbershops = await prisma.barbershop.findMany({
		where: {
			userId: (session?.user as any).id,
		},
		include: {
			user: true,
			bookings: true,
		},
	});

	// const BookingId = barbershops.flatMap(barbershop => barbershop.bookings.map(booking => booking.barbershopId));
	// const BarbershopId = barbershops.map(barbershop => barbershop.id);

	// const myBookings = BookingId.filter(id => BarbershopId.includes(id)).length;

	// console.log(todayBookings);
	// console.log(myBookings);

	const todayBookings = barbershops.flatMap(barbershop => barbershop.bookings.filter(booking => {
		const bookingDate = new Date(booking.date); 
		const today = new Date(); 
		return ( 
			bookingDate.getDate() === today.getDate() && 
			bookingDate.getMonth() === today.getMonth() && 
			bookingDate.getFullYear() === today.getFullYear() 
		);
	}));
	
	const myBarbershop = barbershops.filter(barbershops => barbershops.user.id === (session?.user as any).id);

	return (
		<div className='border-b border-r border-secondary 2sm:border-b-transparent'>
			<ul className='px-5 pt-5 space-y-4 text-gray-400'>
				<li>
					<Button
						variant={'ghost'}
						className='flex items-center justify-between w-full space-x-4 cursor-default'>
						<p className='flex gap-2'>
							<CalendarDays size={16} />
              Agendados Hoje
						</p>
						<span className='px-2 font-bold text-white rounded-md bg-primary/50'>
							{todayBookings.length}
						</span>
					</Button>
				</li>

				<li>
					<Button
						variant={'ghost'}
						className='flex items-center justify-between w-full space-x-4 cursor-default'>
						<p className='flex gap-2'>
							<Newspaper size={16} />
              Suas Barbearias
						</p>
						<span className='px-2 font-bold text-white rounded-md bg-primary/50'>
							{myBarbershop.length}
						</span>
					</Button>
				</li>

				<Separator 
					orientation='horizontal' 
					className='w-full h-px bg-secondary'
				/>
			</ul>

			<ul className='px-5 pt-4 pb-5 space-y-2 text-gray-400'>
				<li>
					<Button
						variant={'ghost'}
						className='flex justify-start w-full gap-2'>
						<Newspaper size={16} />
						Editar Barbearias
					</Button>
				</li>
					
				<li>
					<Button
						variant={'ghost'}
						className='flex justify-start w-full gap-2'>
						<LayoutPanelLeft size={16} />
						Editar Serviços
					</Button>
				</li>

				<li>
					<Button
						variant={'ghost'}
						className='flex justify-start w-full gap-2'
						disabled>
						<TimerReset size={16} />
						Editar Horários
					</Button>
				</li>
			</ul>
        
		</div>
	);
};
