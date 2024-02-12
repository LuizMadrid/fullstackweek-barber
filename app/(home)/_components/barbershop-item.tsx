import Image from 'next/image';

import { Barbershop } from '@prisma/client';

import { Card, CardContent } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Badge } from '../../_components/ui/badge';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

interface BarbershopItemProps {
	barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
	return (
		<>
			<Card className='p-1 min-w-48 sm:min-w-60 rounded-xl group'>
				<CardContent className='p-0'>
					<div className='flex flex-[4] h-40 w-full relative overflow-hidden rounded-2xl'>
						<Image 
							fill
							src={barbershop.imageUrl} 
							alt={barbershop.name} 
							className='object-fill transition-all group-hover:scale-105 group-hover:transition-all'
						/>
						
						<Badge className='absolute flex gap-1 p-1 top-2 left-2 bg-purple-500/10 backdrop-blur-md'>
							<StarIcon className='size-4 text-primary fill-primary' />
							<span>5,0</span>
						</Badge>
					</div>

					<div className='flex flex-[3] flex-col justify-between items-stretch gap-1 h-36 p-2'>
						<div>
							<h2 className='text-lg font-semibold truncate'>{barbershop.name}</h2>
							<p className='text-sm text-gray-400'>{barbershop.address}</p>
						</div>
						
						<Link href={`/barbershops/${barbershop.id}`} passHref>
							<Button 
								variant='secondary' 
								className='w-full mt-3 transition-all hover:bg-primary hover:transition-all'>
								Reservar
							</Button>
						</Link>
					</div>
					
				</CardContent>
			</Card>
		</>
	);
};
