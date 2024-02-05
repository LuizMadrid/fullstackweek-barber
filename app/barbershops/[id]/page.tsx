import prisma from '@/app/_lib/prisma';

import { BarbershopInfo } from './_components/barbershop-info';
import { ServiceItem } from './_components/service-item';
import { Button } from '@/app/_components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface BarbershopPageProps {
	params: {
		id?: string;
	};
}

const BarbershopDetails = async ({ params }: BarbershopPageProps) => {

	const session = await getServerSession(authOptions);

	const barbershop = await prisma.barbershop.findUnique({
		where: {
			id: params.id,
		},
		include: {
			services: true,
		}
	});

	return (
		<>
			{barbershop && <BarbershopInfo barbershop={barbershop} />}

			<div className='flex flex-col gap-6'>
				<div className='flex gap-3 px-5'>
					<Button variant={'default'}>
					Serviços
					</Button>

					<Button variant={'outline'}>
					informações
					</Button>
				</div>

				<div className='flex flex-col gap-4 px-5'>
					{barbershop?.services.map((service) => (
						<ServiceItem key={service.id} service={service} isAuth={!!session?.user} />
					))}
				</div>
			</div>
		</>
	);
};

export default BarbershopDetails;