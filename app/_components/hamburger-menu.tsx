'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { SignInDialog } from './signin-dialog';
import { SignOutDialog } from './signout-dialog';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Dialog, DialogTrigger } from './ui/dialog';

import { CalendarDays, Home, LogIn, LogOut, MenuIcon } from 'lucide-react';

export const HamburgerMenu = () => {

	const {data, status} = useSession();
	
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'outline'} size={'icon'} className='size-8 hover:bg-primary'>
					<MenuIcon size={16} />
				</Button>
			</SheetTrigger>

			<SheetContent className='p-0'>
				<SheetHeader className='text-left p-5 border-b border-secondary'>
					<SheetTitle>
						Menu
					</SheetTitle>
				</SheetHeader>

				<div className='flex justify-between px-5 py-6'>
					<div className='flex gap-2 items-center'>
						<Image 
							src={data?.user?.image ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
							alt={data?.user?.name ?? 'Erro ao carregar imagem!'} 
							width={40} 
							height={40} 
							className='rounded-full'
						/>
						<h2 className='text-base truncate'>
							{data?.user ? data.user.name : 'Olá, faça seu login!'}
						</h2>
					</div>

					{status === 'authenticated' && (
						<Dialog>
							<DialogTrigger asChild>
								<Button variant={'secondary'}>
									<LogOut size={16} />
								</Button>
							</DialogTrigger>
							
							<SignOutDialog />
						</Dialog>
					)}
				</div>

				<div className='px-5'>
					{status === 'unauthenticated' && (
						<Dialog>
							<DialogTrigger asChild>
								<Button 
									variant={'secondary'} 
									className='flex gap-2 justify-start items-center w-full rounded-lg mb-8'>
									<LogIn size={16} />
									Fazer Login!
								</Button>
							</DialogTrigger>
								
							<SignInDialog />
						</Dialog>
					)}

					{status === 'authenticated' && (
						<div className='flex flex-col gap-3'>
							<Link href={'/'} prefetch={true}>
								<Button 
									variant={'outline'} 
									className='flex gap-2 justify-start items-center w-full rounded-lg'>
									<Home size={16} />
									Início
								</Button>
							</Link>

							<Link href={'/bookings'} prefetch={true}>
								<Button 
									variant={'outline'} 
									className='flex gap-2 justify-start items-center w-full rounded-lg'>
									<CalendarDays size={16} />
									Agendamentos
								</Button>
							</Link>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
