import Link from 'next/link';
import Image from 'next/image';

import { Prisma } from '@prisma/client';

import { Card, CardContent } from '@/app/_components/ui/card';
import { Separator } from '@/app/_components/ui/separator';

interface UserBarbershopsProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      user: true;
    };
  }>;
}

export const UserBarbershops = ({ barbershop }: UserBarbershopsProps) => {
	return (
		<Link href={`/barbershops/${barbershop.id}`} passHref>
			<Card className='group border-transparent p-0'>
				<CardContent className='p-0 pb-2 space-y-4'>
					<div className='flex flex-[4] h-44 w-full relative overflow-hidden rounded-t-xl'>
						<Image 
							fill
							sizes='100%'
							src={barbershop.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} 
							alt={barbershop.name} 
							className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
						/>
					</div>

					<div className='px-5 space-y-4'>
						<Separator
							orientation='horizontal' 
							className='w-full h-px bg-secondary'
						/>
            
						<h1 className='uppercase text-gray-400 truncate text-center'>{barbershop.name}</h1>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
