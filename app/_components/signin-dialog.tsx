import { signIn } from 'next-auth/react';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';

import { Button } from './ui/button';
import { FaGoogle, FaGithub } from 'react-icons/fa6';

export const SignInDialog = () => {

	const handleLoginGoogle = async () => {
		await signIn('google');
	};
	
	return (
		<DialogContent className='flex flex-col items-center justify-center border-none rounded-lg w-fit'>
			<DialogHeader>
				<DialogTitle className='text-center'>Faça login na plataforma</DialogTitle>
				<DialogDescription className='text-center text-gray-400'>
					Conecte-se usando conta do Google ou Github.
				</DialogDescription>
			</DialogHeader>

			<div className='flex justify-between w-full gap-4'>
				<Button 
					variant={'outline'} 
					onClick={handleLoginGoogle}
					className='flex items-center justify-center w-full gap-2 font-bold'>
					<FaGoogle className='text-base text-white' />
					Google
				</Button>

				<Button 
					variant={'outline'} 
					disabled
					className='flex items-center justify-center w-full gap-2 font-bold'>
					<FaGithub className='text-base text-white' />
					Github
				</Button>
			</div>
		</DialogContent>
	);
};
