'use client';

import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface AsidePainelProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      user: true;
      bookings: true;
    };
  }>[];

  bookings: Prisma.BookingGetPayload<{
    include: {
      barbershop: true;
      user: true;
    };
  }>[];
}

export const AsidePainel = ({ barbershop, bookings }: AsidePainelProps) => {

	const { data } = useSession();

	const todayBookings = bookings.filter(booking => {
		const bookingDate = new Date(booking.date);
		const today = new Date();
		return (
			booking.barbershop.id === (data?.user as any).id &&
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
		);
	});

	const bookingsCount = todayBookings.length;

	const myBarbershop = barbershop.filter(barbershop => barbershop.user.id === (data?.user as any).id);

	return (
		<div className='h-full border-r w-44 border-secondary'>
			<ul>
				<li>
          Agendamentos
					{bookingsCount != 0 ? (
						<span>{bookingsCount}</span>
					) : (
						<span>0</span>
					)}
				</li>

				<li>
					Barbearias
					{barbershop.map.length !== 0 ? (
						<span>
							{myBarbershop.length}
						</span>
					) : (
						<span>0</span>
					)}
				</li>
			</ul>
		</div>
	);
};
