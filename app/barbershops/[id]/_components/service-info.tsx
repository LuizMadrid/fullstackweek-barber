'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Barbershop } from '@prisma/client';

import { Smartphone } from 'lucide-react';

import { Button } from '@/app/_components/ui/button';
import CopyButton from '@/app/_components/copy-button';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar';
import { BarbershopServiceInfoSkeleton } from '@/app/_components/skeletons/skeleton';

interface ServiceInfoProps {
	barbershop: Barbershop
}

export const ServiceInfo = ({ barbershop }: ServiceInfoProps) => {

	const {status} = useSession();

	const [phone1Copied, setPhone1Copied] = useState(false);
	const [phone2Copied, setPhone2Copied] = useState(false);

	const handleCopyPhone1 = () => {
		setPhone1Copied(true);
		setTimeout(() => {
			setPhone1Copied(false);
		}, 1000 * 2);
	};

	const handleCopyPhone2 = () => {
		setPhone2Copied(true);
		setTimeout(() => {
			setPhone2Copied(false);
		}, 1000 * 2);
	};

	if (status === 'loading') {
		return (
			<div>
				<BarbershopServiceInfoSkeleton />
			</div>
		);
	}
  
	return (
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

								<Button 
									onClick={handleCopyPhone1}
									variant={
										phone1Copied ? 'success' : 'secondary'
									}
									className='w-24'>
									<CopyButton textToCopy={'(11) 99999-9999'}>
										{phone1Copied ? 'Copiado' : 'Copiar'}
									</CopyButton>
								</Button>
							</div>

							<div className='flex justify-between items-center'>
								<h3 className='flex gap-2'>
									<Smartphone size={24} />
                    &#40;11&#41; 92929-9292
								</h3>

								<Button 
									onClick={handleCopyPhone2}
									variant={
										phone2Copied ? 'success' : 'secondary'
									}
									className='w-24'>
									<CopyButton textToCopy={'(11) 92929-9292'}>
										{phone2Copied ? 'Copiado' : 'Copiar'}
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
	);
};
