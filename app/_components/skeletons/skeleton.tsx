import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';

const HeaderSkeleton = () => {
	return (
		<header className="flex items-center justify-between p-5 border-b lg:px-32 bg-background border-secondary">

			<Skeleton className='h-10 w-32' />

			<div className='lg:hidden'>
				<Skeleton className='size-8'  />
			</div>

			<div className='hidden lg:flex lg:items-center lg:gap-6'>
				<Skeleton className='h-6 w-36' />

				<div className='flex gap-2 items-center'>
					<Skeleton className='w-9 h-9 rounded-full' />
					<Skeleton className='w-32 h-6' />
				</div>
			</div>
		</header>
	);
};

const BarbershopHeaderSkeleton = () => {
	return (
		<header className='absolute top-0 z-50 w-full p-5 lg:px-32 sm:bg-background sm:border-b sm:border-secondary sm:static'>
			<div className='flex justify-between sm:hidden'>
				<Skeleton className='size-8' />

				<Skeleton className='size-8' />
			</div>

			<div className='hidden sm:flex sm:justify-between sm:items-center'>
				<Skeleton className='h-10 w-32' />

				<div className='hidden sm:block lg:hidden'>
					<Skeleton className='size-8' />
				</div>

				<div className='hidden 2lg:flex 2lg:items-center 2lg:gap-3 2lg:w-1/2'>
					<Skeleton className='h-9 w-full' />
					<Skeleton className='h-9 w-11' />
				</div>

				<div className='hidden lg:flex lg:items-center lg:gap-6'>
					<Skeleton className='h-6 w-36' />

					<div className='flex gap-2 items-center'>
						<Skeleton className='w-9 h-9 rounded-full' />
						<Skeleton className='w-32 h-6' />
					</div>
				</div>
			</div>
		</header>
	);
};

const BarbershopItemSkeleton = () => {
	return (
		<>
			<Card className='p-1 rounded-xl w-full group'>
				<CardContent className='p-0'>
					<Skeleton className='h-40 w-full rounded-2xl' />

					<div className='flex flex-[3] flex-col justify-between items-stretch gap-1 h-36 p-2'>
						<div className='space-y-2'>
							<Skeleton className='w-2/4 h-6' />
							<Skeleton className='w-3/4 h-4' />
						</div>
					
						<Skeleton className='w-full mt-3 h-10' />
					</div>
					
				</CardContent>
			</Card>
		</>
	);
};

export { HeaderSkeleton, BarbershopHeaderSkeleton, BarbershopItemSkeleton };
