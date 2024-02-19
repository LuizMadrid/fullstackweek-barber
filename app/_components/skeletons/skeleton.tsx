import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';

const HeaderSkeleton = () => {
	return (
		<header className="flex items-center justify-between p-5 border-b lg:px-32 bg-background border-secondary">

			<Skeleton className='w-32 h-10' />

			<div className='lg:hidden'>
				<Skeleton className='size-8'  />
			</div>

			<div className='hidden lg:flex lg:items-center lg:gap-6'>
				<Skeleton className='h-6 w-36' />

				<div className='flex items-center gap-2'>
					<Skeleton className='rounded-full w-9 h-9' />
					<Skeleton className='w-32 h-6' />
				</div>
			</div>
		</header>
	);
};

const SearchSkeleton = () => {
	return (
		<div className='flex gap-4'>
			<Skeleton className='w-full h-10' />
			<Skeleton className='w-12 h-10' />
		</div>
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
				<Skeleton className='w-32 h-10' />

				<div className='hidden sm:block lg:hidden'>
					<Skeleton className='size-8' />
				</div>

				<div className='hidden 2lg:flex 2lg:items-center 2lg:gap-3 2lg:w-1/2'>
					<Skeleton className='w-full h-9' />
					<Skeleton className='h-9 w-11' />
				</div>

				<div className='hidden lg:flex lg:items-center lg:gap-6'>
					<Skeleton className='h-6 w-36' />

					<div className='flex items-center gap-2'>
						<Skeleton className='rounded-full w-9 h-9' />
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
			<Card className='w-full p-1 rounded-xl group'>
				<CardContent className='p-0'>
					<Skeleton className='w-full h-40 rounded-2xl' />

					<div className='flex flex-[3] flex-col justify-between items-stretch gap-1 h-36 p-2'>
						<div className='space-y-2'>
							<Skeleton className='w-2/4 h-6' />
							<Skeleton className='w-3/4 h-4' />
						</div>
					
						<Skeleton className='w-full h-10 mt-3' />
					</div>
					
				</CardContent>
			</Card>
		</>
	);
};

const BarbershopServiceItemSkeleton = () => {
	return (
		<Card className='flex items-center gap-3 p-3 group'>
			<div className='flex flex-[2] size-32 relative overflow-hidden rounded-lg'>
				<Skeleton className='w-full h-full' />
			</div>

			<div className='flex flex-[4] flex-col justify-between gap-2'>
				<Skeleton className='w-1/2 h-6' />
				<div className='space-y-1'>
					<Skeleton className='w-full h-4' />
					<Skeleton className='w-2/6 h-4' />
				</div>

				<div className='flex items-center justify-between mt-2'>
					<Skeleton className='h-6 w-14' />

					<Skeleton className='w-24 h-10' />
				</div>
			</div>
		</Card>
	);
};

const BarbershopServiceInfoSkeleton = () => {
	return (
		<div className='min-w-[350px]  px-5 lg:px-0'>
			<Card className='w-full h-full border-transparent rounded-xl'>
				<CardContent className='flex flex-col gap-4 p-3'>
					<div className='flex flex-col gap-6'>
						<Skeleton className='w-full h-48 rounded-2xl' />

						<div className='flex flex-col gap-6'>
							<div className='space-y-2'>
								<Skeleton className='w-1/3 h-8' />

								<Skeleton className='w-full h-6' />
								<Skeleton className='w-full h-6' />
								<Skeleton className='w-full h-6' />
								<Skeleton className='w-1/2 h-6' />
							</div>

							<div className='py-5 border-y border-secondary space-y-4'>
								<div className='flex justify-between items-center'>
									<Skeleton className='w-2/4 h-7' />

									<Skeleton className='w-24 h-9' />
								</div>

								<div className='flex justify-between items-center'>
									<Skeleton className='w-2/4 h-7' />

									<Skeleton className='w-24 h-9' />
								</div>
							</div>

							<div className='space-y-2 border-b border-secondary pb-5'>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/4 h-7' />
								</div>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/3 h-7' />
								</div>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/3 h-7' />
								</div>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/3 h-7' />
								</div>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/3 h-7' />
								</div>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/3 h-7' />
								</div>
								<div className='flex justify-between'>
									<Skeleton className='w-2/4 h-7' />
									<Skeleton className='w-1/4 h-7' />
								</div>
							</div>

							<div className='flex justify-between items-center py-6'>
								<Skeleton className='w-1/3 h-6' />

								<Skeleton className='w-1/3 h-14' />
							</div>
						</div>
					</div>
							
				</CardContent>
			</Card>
		</div>
	);
};

const BarbershopInfoSkeleton = () => {
	return (
		<>
			<div className='relative w-full h-64 sm:h-fit sm:hidden'>
				<Skeleton className='w-full h-full' />
			</div>

			<div className='relative min-w-fit h-[50vh] mx-5 hidden sm:block'>
				<Skeleton className='w-full h-full rounded-xl sm:mt-10 lg:mt-0' />
			</div>

			<div className='flex flex-col gap-2 pb-6 mx-5 my-3 mb-6 border-b sm:flex-row sm:justify-between border-secondary lg:border-transparent'>
				<Skeleton className='w-1/2 h-14' />

				<div className='flex items-center gap-2 sm:py-2 sm:px-4 sm:flex-col'>
					<Skeleton className='h-4 w-14 sm:h-7' />
					<Skeleton className='w-24 h-4' />
				</div>
			</div>
		</>
	);
};

const BookingItemSkeleton = () => {
	return (
		<div className='min-w-full'>
			<Card>
				<CardContent className='flex p-0'>
					<div className='flex flex-[3] items-start flex-col gap-2 p-5'>
						<Skeleton className='w-24 h-4' />

						<Skeleton className='w-1/5 h-6' />

						<div className='flex items-center gap-2 text-center'>
							<Skeleton className='rounded-full size-8' />

							<Skeleton className='w-24 h-6' />
						</div>
					</div>

					<div className='flex flex-[1] flex-col gap-1 items-center justify-center border-l border-secondary p-5'>
						<Skeleton className='w-32 h-6' />
									
						<Skeleton className='size-12' />
					
						<Skeleton className='w-24 h-6' />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export { 
	HeaderSkeleton, 
	SearchSkeleton, 
	BarbershopHeaderSkeleton, 
	BarbershopItemSkeleton, 
	BarbershopServiceItemSkeleton, 
	BarbershopServiceInfoSkeleton, 
	BarbershopInfoSkeleton,
	BookingItemSkeleton
};
