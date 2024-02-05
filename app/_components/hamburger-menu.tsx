'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { CalendarDays, Home, LogIn, LogOut, MenuIcon } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';

export const HamburgerMenu = () => {

	const handleLoginClick = async () => {
		await signIn('google');
	};

	const handleLogoutClick = async () => {
		await signOut();
	};

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
						<h2 className='text-base'>
							{data?.user ? data.user.name : 'Olá, faça seu login!'}
						</h2>
					</div>

					{status === 'authenticated' && (
						<Button variant={'secondary'} onClick={handleLogoutClick}>
							<LogOut size={16} />
						</Button>
					)}
				</div>

				<div className='px-5'>
					{status === 'unauthenticated' && (
						<Button 
							variant={'secondary'} 
							onClick={handleLoginClick}
							className='flex gap-2 justify-start items-center w-full rounded-lg mb-8'>
							<LogIn size={16} />
								Fazer Login!
						</Button>
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
