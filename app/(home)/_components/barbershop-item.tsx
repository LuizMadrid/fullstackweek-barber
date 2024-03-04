'use client';

import Image from 'next/image';

import { Barbershop } from '@prisma/client';

import { Card, CardContent } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Badge } from '../../_components/ui/badge';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { BarbershopItemSkeleton } from '@/app/_components/skeletons/skeleton';

interface BarbershopItemProps {
	barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {

	const {status} = useSession();

	if (status === 'loading') {
		return (
			<div>
				<BarbershopItemSkeleton />
			</div>
		);
	}
	
	return (
		<>
			<Card className='p-1 rounded-xl group'>
				<CardContent className='p-1'>
					<div className='flex flex-[4] h-44 w-full relative overflow-hidden rounded-2xl'>
						<Image 
							fill
							sizes='100%'
							src={barbershop.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} 
							alt={barbershop.name} 
							className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
						/>
						
						<Badge className='absolute flex gap-1 p-1 top-2 left-2 bg-purple-500/10 backdrop-blur-md'>
							<StarIcon className='size-4 text-primary fill-primary' />
							<span>5,0</span>
						</Badge>
					</div>

					<div className='flex flex-[3] flex-col justify-between items-stretch gap-1 h-36 p-2'>
						<div>
							<h2 className='text-lg font-bold capitalize truncate'>{barbershop.name}</h2>
							<p className='text-sm text-gray-400 capitalize'>{barbershop.address}</p>
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
