'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { SignInDialog } from './signin-dialog';
import { SignOutDialog } from './signout-dialog';
import { HamburgerMenu } from './hamburger-menu';
import { Dialog, DialogTrigger } from './ui/dialog';

import { CalendarDays, UserCircle2Icon } from 'lucide-react';

export const Header = () => {

	const [isUserAuth, setUserAuth] = React.useState(false);
	
	const {data, status} = useSession();
	const router = useRouter();

	const handleToBookings = () => {
		if (isUserAuth) {
			router.push('/bookings');
		} else {
			setUserAuth(true);
		}
	};

	return (
		<header className="flex items-center justify-between p-5 border-b lg:px-32 bg-background border-secondary">
			<Link href={'/'} prefetch={true}>
				<Image 
					src="/FSW Barber.png" 
					alt="FSW Barber" 
					width={120} 
					height={18} 
				/>
			</Link>

			<div className='lg:hidden'>
				<HamburgerMenu />
			</div>

			<div className='hidden lg:flex lg:gap-2'>
				<Button 
					variant={'ghost'} 
					onClick={handleToBookings}
					className='flex items-center justify-start gap-2'>
					<CalendarDays size={16} />
					Agendamentos
				</Button>

				{status === 'unauthenticated' && (
					<Dialog open={isUserAuth} onOpenChange={setUserAuth}>
						<DialogTrigger asChild>
							<Button 
								className='flex items-center justify-start w-full gap-2 rounded-lg'>
								<UserCircle2Icon size={16} />
								Perfil
							</Button>
						</DialogTrigger>
							
						<SignInDialog />
					</Dialog>
				)}

				{status === 'authenticated' && (
					<Dialog>
						<DialogTrigger asChild>
							<div className='flex items-center w-full gap-2 px-4 rounded-md cursor-pointer hover:bg-secondary/70'>
								<Image
									src={data?.user?.image ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
									alt={data?.user?.name ?? 'Erro ao carregar imagem!'} 
									width={28} 
									height={28} 
									className='rounded-full'
								/>
								<h2 className='font-semibold tracking-tighter'>
									{data?.user?.name}
								</h2>
							</div>
						</DialogTrigger>

						<SignOutDialog />
					</Dialog>
				)}
			</div>

		</header>
	);
};
