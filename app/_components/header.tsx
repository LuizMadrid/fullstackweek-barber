import React from 'react';
import Image from 'next/image';

import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';

export const Header = () => {
	return (
		<header className="justify-between flex items-center p-5 rounded-none bg-background border-b border-secondary">
			<Image 
				src="/FSW Barber.png" 
				alt="FSW Barber" 
				width={120} 
				height={18} 
			/>

			<Button variant={'outline'} size={'icon'} className='size-8'>
				<MenuIcon size={16} />
			</Button>
		</header>
	);
};
