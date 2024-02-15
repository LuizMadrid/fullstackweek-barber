'use client';

import { useEffect, useState } from 'react';
import { BarbershopItemSkeleton } from '../../_components/skeletons/barbershop-item-skeleton';

export const LoadingBarbershopItem = ({ children }: { children: React.ReactNode }) => {

	const [isLoaded, setIsLoaded] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(false);
		}, 2000);
      
	});
  
	return (
		<>
			{isLoaded ? (
				<BarbershopItemSkeleton />
			) : (
				children
			)}
		</>
	);
};
