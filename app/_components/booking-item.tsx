import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { Prisma } from '@prisma/client';

import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookingItemProps {
	booking: Prisma.BookingGetPayload<{
		include: {
			service: true;
			barbershop: true;
		};
	}>;
}

export const BookingItem = ({ booking }: BookingItemProps) => {

	const isBookingPast = isPast(booking.date);
	
	return (
		<>
			<Card>
				<CardContent className={isBookingPast ? 'flex p-0 grayscale' : 'flex p-0'}>
					<div className='flex flex-[3] flex-col gap-2 p-5'>
						<Badge 
							className='bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit'>
							{isBookingPast ? 'Finalizado' : 'Confirmado'}
						</Badge>

						<h2 className='text-lg font-bold sm:text-xs 2md:text-lg'>{booking.service.name}</h2>
						
						<div className='flex items-center gap-2 text-center'>
							<Avatar className='size-8'>
								<AvatarImage src={booking.barbershop.imageUrl} />
								<AvatarFallback>N/A</AvatarFallback>
							</Avatar>

							<h3 className='text-base sm:text-xs 2md:text-base'>{booking.barbershop.name}</h3>
						</div>
					</div>

					<div className='flex flex-[1] flex-col gap-1 items-center justify-center border-l border-secondary p-5'>
						<p className='capitalize'>
							{format(booking.date, 'MMMM', {
								locale: ptBR
							})}
						</p>
						
						<p className='text-4xl'>
							{format(booking.date, 'dd')}
						</p>
						
						<p>
							{format(booking.date, 'hh:mm')}
						</p>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
