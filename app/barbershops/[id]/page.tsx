import React from 'react';
import { db } from '@/app/_lib/prisma';

import { BarbershopInfo } from './_components/barbershop-info';
import { ServiceItem } from './_components/service-item';
import { Button } from '@/app/_components/ui/button';

interface BarbershopPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetails = async ({ params }: BarbershopPageProps) => {

	const barbershop = await db.barbershop.findUnique({
		where: {
			id: params.id,
		},
		include: {
			services: true,
		}
	});

	return (
		<>
			<BarbershopInfo barbershop={barbershop} />

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
					{barbershop.services.map((service:any) => (
						<ServiceItem key={service.id} service={service} />
					))}
				</div>
			</div>
		</>
	);
};

export default BarbershopDetails;