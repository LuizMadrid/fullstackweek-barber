import Image from 'next/image';
import { Barbershop } from '@prisma/client';

import { MapPin, Star } from 'lucide-react';
import { HamburgerMenu } from '@/app/_components/hamburger-menu';
import { BackToPage } from '@/app/_components/go-back';

interface BarbershopDetailsProps {
  barbershop: Barbershop
}

export const BarbershopInfo = ({ barbershop }: BarbershopDetailsProps) => {
	return (
		<>
			<div className='h-64 w-full relative'>
				<Image
					fill
					src={barbershop.imageUrl}
					alt={barbershop.name}
					className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
				/>

				<div className='flex justify-between absolute top-2 w-full p-5'>
					<BackToPage />

					<HamburgerMenu />
				</div>
			</div>

			<div className='flex flex-col gap-2 py-3 px-5 border-b border-secondary pb-6 mb-6'>
				<h1 className='text-2xl font-semibold tracking-tight'>{barbershop.name}</h1>
    
				<p className='flex gap-2 items-center text-sm'>
					<MapPin size={16} className='text-primary fill-primary' />
					{barbershop.address}
				</p>
				<p className='flex gap-2 items-center text-sm'>
					<Star size={16} className='text-primary fill-primary' />
					5.0 (889 avaliações)
				</p>
			</div>
		</>
	);
};
