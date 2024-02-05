'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Barbershop } from '@prisma/client';

import { Card, CardContent } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Badge } from '../../_components/ui/badge';
import { StarIcon } from 'lucide-react';

interface BarbershopItemProps {
	barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {

	const router = useRouter();

	const handleToBarbershop = () => {
		router.push(`/barbershops/${barbershop.id}`);
	};
	
	return (
		<>
			<Card className='min-w-48 max-w-48 p-1 rounded-xl group'>
				<CardContent className='p-0'>
					<div className='flex flex-[4] h-40 w-full relative overflow-hidden rounded-2xl'>
						<Image 
							fill
							src={barbershop.imageUrl} 
							alt={barbershop.name} 
							className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
						/>
						
						<Badge className='absolute top-2 left-2 flex gap-1 p-1 bg-purple-500/10 backdrop-blur-md'>
							<StarIcon className='size-4 text-primary fill-primary' />
							<span>5,0</span>
						</Badge>
					</div>

					<div className='flex flex-[3] flex-col justify-between items-stretch gap-1 h-36 p-2'>
						<div>
							<h2 className='text-lg font-semibold truncate'>{barbershop.name}</h2>
							<p className='text-sm text-gray-400'>{barbershop.address}</p>
						</div>
						
						<Button 
							variant='secondary' 
							onClick={handleToBarbershop}
							className='w-full mt-3 hover:bg-primary transition-all hover:transition-all'>
							Reservar
						</Button>
					</div>
					
				</CardContent>
			</Card>
		</>
	);
};
