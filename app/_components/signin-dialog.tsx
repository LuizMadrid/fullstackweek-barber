import { signIn } from 'next-auth/react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa6';

export const SignInDialog = () => {

	const handleLoginGoogle = async () => {
		await signIn('google');
	};
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button 
					variant={'secondary'} 
					className='flex gap-2 justify-start items-center w-full rounded-lg mb-8'>
					<LogIn size={16} />
					Fazer Login!
				</Button>
			</DialogTrigger>

			<DialogContent className='flex flex-col justify-center items-center w-fit border-none rounded-lg'>
				<DialogHeader>
					<DialogTitle className='text-center'>Faça login na plataforma</DialogTitle>
					<DialogDescription className='text-gray-400 text-center'>
						Conecte-se usando conta do Google ou Github.
					</DialogDescription>
				</DialogHeader>

				<div className='flex justify-between gap-4 w-full'>
					<Button 
						variant={'outline'} 
						onClick={handleLoginGoogle}
						className='flex gap-2 justify-center items-center font-bold w-full'>
						<FaGoogle className='text-base text-white' />
						Google
					</Button>

					<Button 
						variant={'outline'} 
						disabled
						className='flex gap-2 justify-center items-center font-bold w-full'>
						<FaGithub className='text-base text-white' />
						Github
					</Button>
				</div>
			</DialogContent>
		</Dialog>

	);
};