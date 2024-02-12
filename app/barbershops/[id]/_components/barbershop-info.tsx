import Image from 'next/image';
import { Barbershop } from '@prisma/client';

import { MapPin, Star } from 'lucide-react';

interface BarbershopDetailsProps {
  barbershop: Barbershop
}

export const BarbershopInfo = ({ barbershop }: BarbershopDetailsProps) => {
	return (
		<>
			<div className='relative w-full h-64 sm:h-fit sm:hidden'>
				<Image
					fill
					src={barbershop.imageUrl}
					alt={barbershop.name}
					className='object-cover'
				/>
			</div>

			<div className='relative min-w-fit h-[50vh] mx-5 hidden sm:block'>
				<Image
					fill
					src={barbershop.imageUrl}
					alt={barbershop.name}
					className='object-cover sm:pt-10 lg:pt-0 rounded-xl'
				/>
			</div>

			<div className='flex flex-col gap-2 px-5 py-3 pb-6 mb-6 border-b sm:flex-row sm:justify-between border-secondary lg:border-transparent'>
				<div className='flex flex-col gap-2'>
					<h1 className='text-2xl font-semibold tracking-tight sm:text-4xl'>{barbershop.name}</h1>
    
					<p className='flex items-center gap-2 text-sm sm:text-base'>
						<MapPin size={16} className='text-primary fill-primary' />
						{barbershop.address}
					</p>
				</div>

				<div className='flex items-center gap-2 sm:bg-secondary/70 sm:py-2 sm:px-4 sm:rounded-xl sm:flex-col'>
					<p className='flex items-center gap-1 text-sm sm:text-base sm:scale-125'>
						<Star size={16} className='text-primary fill-primary' />
						5.0
					</p>
					<span className='text-sm'>(889 avaliações)</span>
				</div>
			</div>
		</>
	);
};
