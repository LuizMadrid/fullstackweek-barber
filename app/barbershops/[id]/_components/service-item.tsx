import React from 'react';
import Image from 'next/image';
import { Service } from '@prisma/client';

import { Card } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';

interface ServiceItemProps {
 service: Service 
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
	return (
		<>
			<Card className='flex items-center gap-3 p-3 group max-w-md'>
				<div className='flex flex-[2] size-32 relative overflow-hidden rounded-lg'>
					<Image 
						fill
						src={service.imageUrl} 
						alt={service.name} 
						className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
					/>
				</div>

				<div className='flex flex-[4] flex-col justify-between gap-1'>
					<h2 className='font-bold tracking-tight'>{service.name}</h2>
					<p className='text-sm text-gray-400'>{service.description}</p>

					<div className='flex justify-between items-center mt-2'>
						<span 
							className='font-bold text-sm uppercase text-primary'>
							{Intl.NumberFormat(
								'pt-BR',
								{
									style: 'currency',
									currency: 'BRL',
								}
							).format(Number(service.price))}
						</span>	

						<Button 
							variant={'secondary'}
							className='font-bold hover:bg-primary transition-all hover:transition-all'>
							Reservar
						</Button>
					</div>
				</div>
			</Card> 
		</>
	);
};
