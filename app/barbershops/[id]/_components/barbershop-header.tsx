'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Search } from '@/app/(home)/_components/search';
import { BackToPage } from '@/app/_components/go-back';
import { SignInDialog } from '@/app/_components/signin-dialog';
import { HamburgerMenu } from '@/app/_components/hamburger-menu';

import { Button } from '@/app/_components/ui/button';
import { CalendarDays, UserCircle2Icon } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';
import { SignOutDialog } from '@/app/_components/signout-dialog';
import { useRouter } from 'next/navigation';

export const BarbershopHeader = () => {

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
		<div className='absolute top-0 z-50 w-full p-5 lg:px-32 sm:bg-background sm:border-b sm:border-secondary sm:static'>
			<div className='flex justify-between sm:hidden'>
				<BackToPage />

				<HamburgerMenu />
			</div>

			<div className='hidden sm:flex sm:justify-between sm:items-center'>
				<Link href={'/'} prefetch={true}>
					<Image 
						src="/FSW Barber.png" 
						alt="FSW Barber" 
						width={120} 
						height={18} 
					/>
				</Link>
                      
				<div className='hidden sm:block lg:hidden'>
					<HamburgerMenu />
				</div>

				<div className='hidden 2lg:block 2lg:w-1/2'>
					<Search />
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
									className='flex items-center justify-start gap-2 rounded-lg'>
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
								<div className='flex items-center gap-2 px-4 rounded-md cursor-pointer hover:bg-secondary/70'>
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
			</div>
		</div>
	);
};
