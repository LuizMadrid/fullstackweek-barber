'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { SignInDialog } from './signin-dialog';
import { SignOutDialog } from './signout-dialog';
import { HamburgerMenu } from './hamburger-menu';
import { Dialog, DialogTrigger } from './ui/dialog';

import { CalendarDays, LogIn, LogOut } from 'lucide-react';
import { HeaderSkeleton } from './skeletons/skeleton';

export const Header = () => {

	const [isUserAuth, setUserAuth] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [isSingOutOpen, setSignOutOpen] = useState(false);
	const [open] = useState(false);
	
	const {data, status} = useSession();

	const handleSignOut = () => {
		setSignOutOpen(true);
	};

	const dropdownRef = useRef<HTMLDivElement>(null);
	const handleDropdownFocus = (state: boolean) => {
		setMenuIsOpen(!state);

		if (menuIsOpen) {
			setMenuIsOpen(false); 
		}
	};
	
	const handleClickOutsideDropdown = (e:any) => {
		if( menuIsOpen && !dropdownRef.current?.contains(e.target as Node)) {
			setMenuIsOpen(false);
		}
	};

	if(typeof window !== 'undefined')
	{
		window.addEventListener('click', handleClickOutsideDropdown);
	}

	if (status === 'loading') {
		return (
			<div>
				<HeaderSkeleton />
			</div>
		);
	}

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
				{status === 'unauthenticated' && (
					<Dialog open={isUserAuth} onOpenChange={setUserAuth}>
						<DialogTrigger asChild>
							<Button 
								className='flex items-center justify-start w-full gap-2 rounded-lg'>
								<LogIn size={16} />
								Entrar
							</Button>
						</DialogTrigger>
							
						<SignInDialog />
					</Dialog>
				)}

				{status === 'authenticated' && (
					<>
						<div ref={dropdownRef} className='relative'>
							<Button 
								onClick={() => handleDropdownFocus(open)}
								variant={'ghost'}
								className='flex items-center w-full gap-2 px-4 rounded-md cursor-pointer hover:bg-secondary/70'>
								<Image
									src={data?.user?.image ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
									alt={data?.user?.name ?? 'Erro ao carregar imagem!'}
									width={28}
									height={28}
									className='rounded-full' 
								/>

								<h2 className='font-bold tracking-tighter'>
									{data?.user?.name}
								</h2>
							</Button>

							{menuIsOpen && (
								<div className='z-50 absolute top-14 left-[5px] rounded-lg shadow-md gap-4 after:border-l-[16px] after:border-r-[16px] after:border-t-[16px] after:border-transparent after:border-t-secondary after:absolute after:rotate-180 after:-top-[16px] after:left-2 bg-background border border-secondary min-w-32'>
									<div className='flex flex-col justify-stretch p-1 gap-2 w-full'>
										<Link href={'/bookings'} passHref>
											<Button 
												variant={'dropbar'}>
												<CalendarDays size={16} />
												Agendamentos
											</Button>
										</Link>

										<Button 
											onClick={handleSignOut}
											variant={'dropbar'}>
											<LogOut size={16} />
											Sair
										</Button>
									</div>
								</div>
							)}

							<Dialog open={isSingOutOpen} onOpenChange={setSignOutOpen}>
								<SignOutDialog />
							</Dialog>
						</div>

					</>
				)}
			</div>

		</header>
	);
};
