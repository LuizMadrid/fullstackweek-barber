'use server';

import prisma from '@/app/_lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';

export const getDayBookings = async (barbershopId: string, date: Date) => {
	const Bookings = await prisma.booking.findMany({
		where: {
			barbershopId,
			date: {
				lte: endOfDay(date),
				gte: startOfDay(date),
			},
		},
	});

	return Bookings;
};
