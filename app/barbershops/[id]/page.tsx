import { Metadata } from 'next';
import Image from 'next/image';

import prisma from '@/app/_lib/prisma';
import { authOptions } from '@/app/_lib/auth';
import { getServerSession } from 'next-auth';

import { Button } from '@/app/_components/ui/button';
import { ServiceItem } from './_components/service-item';
import { BarbershopInfo } from './_components/barbershop-info';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar';
import { Smartphone } from 'lucide-react';
import CopyButton from '@/app/_components/copy-button';

export const metadata: Metadata = {
	title: 'Barbearias',
};

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
					<CardContent className='flex flex-col gap-4 p-3'>
						<div className='flex flex-col gap-6'>
							<div className='relative h-48 w-full group overflow-hidden rounded-b-2xl cursor-default'>
								<Image 
									fill 
									src={'/fswbackground-map.png'} 
									alt='Mapa do local da reserva'
									className='object-cover group-hover:scale-125 transition-all group-hover:transition-all'
								/>

								<div className='absolute flex items-end px-5 w-full h-full bg-gradient-to-b from-card to-transparent'>
									<Card className='w-full mb-4 mx-auto'>
										<CardContent className='flex justify-stretch items-center gap-4 p-2'>
											<Avatar className='size-8 md:size-12'>
												<AvatarImage src={barbershop?.imageUrl ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
											</Avatar>
												
											<div className='flex flex-col'>
												<h3 className='text-base md:text-lg font-bold text-white'>{barbershop?.name}</h3>
												<p className='text-gray-400 text-xs md:text-sm'>{barbershop?.address}</p>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>

							<div className='flex flex-col gap-6'>
								<div className='space-y-2'>
									<h2 className='uppercase font-bold text-lg tracking-tight'>Sobre Nós</h2>
									<p className='text-gray-400 tracking-tight text-justify leading-5'>Bem-vindo à nossa barbearia, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.</p>
								</div>

								<div className='py-5 border-y border-secondary space-y-4'>
									<div className='flex justify-between items-center'>
										<h3 className='flex gap-2'>
											<Smartphone size={24} />
												&#40;11&#41; 99999-9999
										</h3>

										<Button variant='secondary'>
											<CopyButton textToCopy={'(11) 99999-9999'}>
													Copiar
											</CopyButton>
										</Button>
									</div>

									<div className='flex justify-between items-center'>
										<h3 className='flex gap-2'>
											<Smartphone size={24} />
												&#40;11&#41; 92929-9292
										</h3>

										<Button variant='secondary'>
											<CopyButton textToCopy={'(11) 92929-9292'}>
													Copiar
											</CopyButton>
										</Button>
									</div>
								</div>

								<div className='space-y-2 border-b border-secondary pb-5'>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Domingo</p>
										<span>Fechado</span>
									</div>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Segunda-Feira</p>
										<span>09:00 - 21:00</span>
									</div>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Terça-Feira</p>
										<span>09:00 - 21:00</span>
									</div>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Quarta-Feira</p>
										<span>09:00 - 21:00</span>
									</div>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Quinta-Feira</p>
										<span>09:00 - 21:00</span>
									</div>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Sexta-Feira</p>
										<span>09:00 - 21:00</span>
									</div>
									<div className='flex justify-between'>
										<p className='text-gray-400'>Sábado</p>
										<span>Fechado</span>
									</div>
								</div>

								<div className='flex justify-between items-center py-6'>
									<h2>Em parceria com</h2>
									<Image 
										src="/FSW Barber.png" 
										alt="FSW Barber" 
										width={140} 
										height={24} 
									/>
								</div>
							</div>
						</div>
							
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default BarbershopDetails;