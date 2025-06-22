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
		<Card className="p-0 border-transparent group cursor-pointer">
			<CardContent className="p-0 pb-2 space-y-4">
				<div className="flex flex-[4] h-44 w-full relative overflow-hidden rounded-t-xl">
					<Image
						fill
						sizes="100%"
						src={
							barbershop.imageUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
						}
						alt={barbershop.name}
						className="object-cover transition-all group-hover:scale-105 group-hover:transition-all"
					/>
				</div>

				<div className="px-5 space-y-4">
					<Separator
						orientation="horizontal"
						className="w-full h-px bg-secondary"
					/>

					<h1 className="text-center text-gray-400 uppercase truncate">
						{barbershop.name}
					</h1>
				</div>
			</CardContent>
		</Card>
	);
};
