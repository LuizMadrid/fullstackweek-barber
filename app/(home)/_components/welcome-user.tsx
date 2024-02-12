'use client';

import { useSession } from 'next-auth/react';

export const WelcomeForUser = () => {

	const {data, status} = useSession();
  
	return (
		<div className='flex gap-2 text-xl font-bold'>
			<span className='font-normal'>Olá,</span>

			{status === 'unauthenticated' && (
				<h2>Faça seu Login!</h2>
			)}

			{status === 'authenticated' && (
				<h2>{data?.user?.name?.split(' ')[0]}!</h2>
			)}
		</div>
	);
};
