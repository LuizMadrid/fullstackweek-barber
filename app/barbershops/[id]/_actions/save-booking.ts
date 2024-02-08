'use server';

import prisma from '@/app/_lib/prisma';

interface SaveBookingProps {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const SaveBooking = async (params: SaveBookingProps) => {
	await prisma.booking.create({
		data: {
			barbershopId: params.barbershopId,
			serviceId: params.serviceId,
			userId: params.userId,
			date: params.date,
		}
	});
};
