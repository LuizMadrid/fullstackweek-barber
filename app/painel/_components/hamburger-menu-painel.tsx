'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { CalendarDays, Home, LayoutPanelLeft, LogOut, MenuIcon, Newspaper, PanelRightOpen, TimerReset } from 'lucide-react';

import { Button } from '@/app/_components/ui/button';
import { SignOutDialog } from '@/app/_components/signout-dialog';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/_components/ui/sheet';
import { Separator } from '@/app/_components/ui/separator';

export const HamburgerMenuPainel = () => {

	const {data} = useSession();
	
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

					<Dialog>
						<DialogTrigger asChild>
							<Button variant={'secondary'}>
								<LogOut size={16} />
							</Button>
						</DialogTrigger>
							
						<SignOutDialog />
					</Dialog>
				</div>

				<div className='px-5'>
					<div className='flex flex-col gap-3'>
						<Link href={'/'} passHref>
							<Button
								variant={'outline'} 
								className='flex items-center justify-start w-full gap-2 rounded-lg'>
								<LayoutPanelLeft size={16} />
								Editar Informações
							</Button>
						</Link>

						<Link href={'/'} passHref>
							<Button
								variant={'outline'} 
								className='flex items-center justify-start w-full gap-2 rounded-lg'
								disabled>
								<TimerReset size={16} />
								Editar Horários
							</Button>
						</Link>

						<Separator orientation='horizontal' className='w-full h-px bg-secondary my-4' />

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

						<Link href={'/create'} passHref>
							<Button 
								variant={'outline'}
								className='flex items-center justify-start w-full gap-2 rounded-lg'>
								<Newspaper size={16} />
									Criar Barbearia
							</Button>
						</Link>

						<Link href={'/painel'} passHref>
							<Button 
								variant={'outline'}
								className='flex items-center justify-start w-full gap-2 rounded-lg'>
								<PanelRightOpen size={16} />
									Seu Painel
							</Button>
						</Link>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
