import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const BookingItem = () => {
	return (
		<>
			<Card>
				<CardContent className='flex p-0'>
					<div className='flex flex-[3] flex-col gap-2 p-5'>
						<Badge className='bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit'>Confirmado</Badge>

						<h2 className='text-base sm:text-lg font-bold'>Corte de Cabelo</h2>
						
						<div className='flex text-center items-center gap-2'>
							<Avatar className='size-8'>
								<AvatarImage src='https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png' />
								<AvatarFallback>N/A</AvatarFallback>
							</Avatar>

							<h3 className='text-xs sm:text-base'>Vintage Barber</h3>
						</div>
					</div>

					<div className='flex flex-[1] flex-col items-center justify-center border-l border-secondary p-5'>
						<p>Fevereiro</p>
						<p className='text-4xl'>06</p>
						<p>09:45</p>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
