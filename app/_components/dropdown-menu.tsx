'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { SignOutDialog } from '@/app/_components/signout-dialog';

import { CalendarDays, LogOut, Newspaper } from 'lucide-react';

export const DropdownMenu = () => {

	const {data} = useSession();

	const [isSingOutOpen, setSignOutOpen] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const [open] = useState(false);

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
  
	return (
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
					<div className='flex flex-col w-full gap-2 p-1 justify-stretch'>
						<Link href={'/create'} passHref>
							<Button 
								variant={'dropbar'}>
								<Newspaper size={16} />
                Criar Barbearia
							</Button>
						</Link>

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
	);
};