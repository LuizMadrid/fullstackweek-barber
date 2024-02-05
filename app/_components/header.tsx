'use client';

import Image from 'next/image';

import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import { MenuIcon } from 'lucide-react';

export const Header = () => {

	const handleLoginClick = async () => {
		await signIn();
	};

	const {data} = useSession();
	
	return (
		<header className="justify-between flex items-center p-5 rounded-none bg-background border-b border-secondary">
			<Image 
				src="/FSW Barber.png" 
				alt="FSW Barber" 
				width={120} 
				height={18} 
			/>

			{data?.user ? (
				<div className='flex gap-2 items-center'>
					<Image 
						src={data.user.image ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
						alt={data.user.name ?? 'Guest'} 
						width={28} 
						height={28} 
						className='rounded-full'
					/>
					
					<Button variant={'outline'} size={'icon'} className='size-8'>
						<MenuIcon size={16} />
					</Button>
				</div>
			) : (
				<Button onClick={handleLoginClick}>
					Login
				</Button>
			)}


		</header>
	);
};
