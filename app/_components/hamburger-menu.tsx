'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { SignInDialog } from './signin-dialog';
import { SignOutDialog } from './signout-dialog';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Dialog, DialogTrigger } from './ui/dialog';

import { CalendarDays, Home, LogIn, LogOut, MenuIcon, PanelRightOpen } from 'lucide-react';

export const HamburgerMenu = () => {

	const {data, status} = useSession();
	
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'secondary'} size={'icon'} className='size-8 hover:bg-primary'>
					<MenuIcon size={16} />
				</Button>
			</SheetTrigger>

			<SheetContent className='p-0'>
				<SheetHeader className='p-5 text-left border-b border-secondary'>
					<SheetTitle>
						Menu
					</SheetTitle>
				</SheetHeader>

				<div className='flex justify-between px-5 py-6'>
					<div className='flex items-center gap-2'>
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
									className='flex items-center justify-start w-full gap-2 mb-8 rounded-lg'>
									<LogIn size={16} />
									Fazer Login!
								</Button>
							</DialogTrigger>
								
							<SignInDialog />
						</Dialog>
					)}

					{status === 'authenticated' && (
						<div className='flex flex-col gap-3'>
							<Link href={'/'} passHref>
								<Button 
									variant={'outline'} 
									className='flex items-center justify-start w-full gap-2 rounded-lg'>
									<Home size={16} />
									Início
								</Button>
							</Link>

							<Link href={'/bookings'} passHref>
								<Button 
									variant={'outline'} 
									className='flex items-center justify-start w-full gap-2 rounded-lg'>
									<CalendarDays size={16} />
									Agendamentos
								</Button>
							</Link>

							<Link href={'/panel'} passHref>
								<Button 
									variant={'outline'}
									className='flex items-center justify-start w-full gap-2 rounded-lg'>
									<PanelRightOpen size={16} />
									Seu Painel
								</Button>
							</Link>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
