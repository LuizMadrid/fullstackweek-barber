import { Metadata } from 'next';

import prisma from '@/app/_lib/prisma';
import { authOptions } from '@/app/_lib/auth';
import { getServerSession } from 'next-auth';

// import { Button } from '@/app/_components/ui/button';
import { ServiceItem } from './_components/service-item';
import { BarbershopInfo } from './_components/barbershop-info';
import { ServiceInfo } from './_components/service-info';

export async function generateMetadata({
	params,
}: BarbershopPageProps): Promise<Metadata> {
	const barbershop = await prisma.barbershop.findUnique({
		where: {
			id: params.id,
		},
	});

	return {
		title: `${barbershop?.name ?? 'Barbearia'}`,
	};
}

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
			user: true,
		}
	});

	return (
		<div className='flex flex-col gap-2 2lg:flex-row lg:px-32 lg:pt-10'>
			<div className='2lg:flex-[5] xl:flex-[7]'>
				<BarbershopInfo barbershop={barbershop as any} />

				<div className='flex flex-col gap-6'>
					{/* <div className='flex gap-3 px-5 2lg:hidden'>
						<Button variant={'default'}>
							Serviços
						</Button>

						<Button variant={'outline'}>
							Informações
						</Button>
					</div> */}

					{barbershop?.services.length != 0 ? (
						<div className='flex flex-col gap-4 px-5 2sm:grid 2sm:grid-cols-2 2xl:grid-cols-3'>
							{barbershop?.services.map((service) => (
								<ServiceItem key={service.id} barbershop={barbershop} service={service} isAuth={!!session?.user}/>
							))}
						</div>
					) : (
						<div className='h-full mx-auto my-12 font-bold text-center text-gray-400'>
							<p className='text-lg uppercase'>Ops...</p>
							<p className=''>Essa barbearia não possui nenhum serviço cadastrado!</p>
						</div>
					)}

					<div className='2lg:hidden px-5 border-t border-secondary pt-5'>
						<ServiceInfo barbershop={barbershop as any} />
					</div>
				</div>
			</div>

			<div className='hidden 2lg:flex 2lg:flex-[2] px-5 lg:px-0'>
				<ServiceInfo barbershop={barbershop as any} />
			</div>
		</div>
	);
};

export default BarbershopDetails;