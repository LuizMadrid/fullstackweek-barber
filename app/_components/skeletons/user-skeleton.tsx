import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const UserSkeleton = () => {
	return (
		<>
			<Skeleton className='w-7 h-7 rounded-full' />
			<Skeleton className='w-full h-6' />
		</>
	);
};
