import prisma from '@/app/_lib/prisma';

import { BarbershopInfo } from './_components/barbershop-info';
import { ServiceItem } from './_components/service-item';
import { Button } from '@/app/_components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BarbershopHeader } from './_components/barbershop-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';

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
			<BarbershopHeader />
		
			<div className='flex flex-col 2lg:flex-row lg:px-32 lg:pt-10 gap-2'>
				<div className='2lg:flex-[5] xl:flex-[7]'>
					<BarbershopInfo barbershop={barbershop as any} />

					<div className='flex flex-col gap-6'>
						<div className='flex gap-3 px-5 2lg:hidden'>
							<Button variant={'default'}>
							Serviços
							</Button>

							<Button variant={'outline'}>
							informações
							</Button>
						</div>

						<div className='flex flex-col gap-4 px-5 lg:grid lg:grid-cols-2 2xl:grid-cols-3'>
							{barbershop?.services.map((service) => (
								<ServiceItem key={service.id} barbershop={barbershop} service={service} isAuth={!!session?.user} />
							))}
						</div>
					</div>
				</div>

				<div className='hidden 2lg:flex 2lg:flex-[2] px-5 lg:px-0'>
					<Card className='w-full h-full border-transparent rounded-xl'>
						<CardContent className='flex flex-col gap-4'>
							<CardHeader>
								<CardTitle className='text-xl font-semibold'>Informações</CardTitle>
							</CardHeader>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default BarbershopDetails;