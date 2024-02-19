'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Search } from '@/app/(home)/_components/search';
import { BackToPage } from '@/app/_components/go-back';
import { SignInDialog } from '@/app/_components/signin-dialog';
import { HamburgerMenu } from '@/app/_components/hamburger-menu';

import { Button } from '@/app/_components/ui/button';
import { CalendarDays, LogIn, LogOut } from 'lucide-react';
import { SignOutDialog } from '@/app/_components/signout-dialog';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';
import { BarbershopHeaderSkeleton } from '@/app/_components/skeletons/skeleton';

export const BarbershopHeader = () => {

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
				<BarbershopHeaderSkeleton />
			</div>
		);
	}
  
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
			</div>
		</div>
	);
};
