import { signOut } from 'next-auth/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export const SignOutDialog = () => {

	const handleLogoutClick = async () => {
		await signOut();
	};
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'secondary'}>
					<LogOut size={16} />
				</Button>
			</DialogTrigger>

			<DialogContent className='flex flex-col justify-center items-center w-fit border-none rounded-lg'>
				<DialogHeader>
					<DialogTitle className='text-center'>Sair</DialogTitle>
					<DialogDescription className='text-gray-400 text-center'>
						Deseja mesmo sair da plataforma?
					</DialogDescription>
				</DialogHeader>

				<div className='flex justify-between gap-4 w-full'>
					<DialogPrimitive.Close asChild>
						<Button 
							variant={'secondary'}
							className='flex gap-2 justify-center items-center font-bold min-w-32 w-full'>
							Cancelar
						</Button>
					</DialogPrimitive.Close>

					<Button 
						variant={'destructive'}
						onClick={handleLogoutClick}
						className='flex gap-2 justify-center items-center font-bold min-w-32 w-full'>
						Sair
					</Button>
				</div>
			</DialogContent>
		</Dialog>

	);
};
