import prisma from '../_lib/prisma';

import { AsidePainel } from './_components/aside-painel';

import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

const page = async () => {

	const session = await getServerSession(authOptions);

	const [barbershops, bookings] = await Promise.all([
		prisma.barbershop.findMany({
			where: {
				userId: (session?.user as any).id,
			},
			include: {
				user: true,
			},
		}),

		prisma.booking.findMany({
			where: {
				userId: (session?.user as any).id,
			},
			include: {
				barbershop: true,
			},
		}),
	]);
	
	return (
		<div>
			<AsidePainel barbershop={barbershops as any} bookings={bookings as any} />
		</div>
	);
};

export default page;