import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export const BackToPage = () => {
	return (
		<Link href='/' passHref>
			<Button 
				variant={'secondary'} 
				size={'icon'} 
				className='size-8 hover:bg-primary'>
				<ChevronLeft size={16} />
			</Button>
		</Link>
	);
};
