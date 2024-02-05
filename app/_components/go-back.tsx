'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

export const BackToPage = () => {

	const router = useRouter();

	const handleBack = () => {
		router.replace('/');
	};
  
	return (
		<Button 
			variant={'secondary'} 
			size={'icon'} 
			onClick={handleBack}
			className='size-8 hover:bg-primary'>
			<ChevronLeft size={16} />
		</Button>
	);
};
