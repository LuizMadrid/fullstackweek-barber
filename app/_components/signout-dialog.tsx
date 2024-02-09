import { signOut } from 'next-auth/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';

import { Button } from './ui/button';

export const SignOutDialog = () => {

	const handleLogoutClick = async () => {
		await signOut();
	};
	
	return (
		<DialogContent className='flex flex-col items-center justify-center border-none rounded-lg w-fit'>
			<DialogHeader>
				<DialogTitle className='text-center'>Sair</DialogTitle>
				<DialogDescription className='text-center text-gray-400'>
					Deseja mesmo sair da plataforma?
				</DialogDescription>
			</DialogHeader>

			<div className='flex justify-between w-full gap-4'>
				<DialogPrimitive.Close asChild>
					<Button 
						variant={'secondary'}
						className='flex items-center justify-center w-full gap-2 font-bold min-w-32'>
						Cancelar
					</Button>
				</DialogPrimitive.Close>

				<Button 
					variant={'destructive'}
					onClick={handleLogoutClick}
					className='flex items-center justify-center w-full gap-2 font-bold min-w-32'>
					Sair
				</Button>
			</div>
		</DialogContent>
	);
};
