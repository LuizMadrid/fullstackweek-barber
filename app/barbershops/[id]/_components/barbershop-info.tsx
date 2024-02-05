'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Barbershop } from '@prisma/client';

import { Button } from '@/app/_components/ui/button';

import { ChevronLeft, MenuIcon, MapPin, Star } from 'lucide-react';

interface BarbershopDetailsProps {
  barbershop: Barbershop
}

export const BarbershopInfo = ({ barbershop }: BarbershopDetailsProps) => {

	const router = useRouter();

	const handleBack = () => {
		router.back();
	};
	
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
					<Button 
						variant={'secondary'} 
						size={'icon'} 
						onClick={handleBack}
						className='size-8 hover:bg-primary'>
						<ChevronLeft size={16} />
					</Button>

					<Button variant={'secondary'} size={'icon'} className='size-8 hover:bg-primary'>
						<MenuIcon size={16} />
					</Button>
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
