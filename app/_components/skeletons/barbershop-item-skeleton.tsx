import { Card, CardContent } from '@/app/_components/ui/card';
import { Skeleton } from '@/app/_components/ui/skeleton';

export const BarbershopItemSkeleton = () => {
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
					
						<Skeleton className='w-full mt-3 h-8' />
					</div>
					
				</CardContent>
			</Card>
		</>
	);
};
