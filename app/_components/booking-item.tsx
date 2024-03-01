'use client';

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BookingItemSkeleton } from './skeletons/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from './ui/sheet';

import { Prisma } from '@prisma/client';

import { CancelBooking } from './actions/cancel-booking';

import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Loader2 } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { FaCircleCheck } from 'react-icons/fa6';

interface BookingItemProps {
	booking: Prisma.BookingGetPayload<{
		include: {
			service: true;
			barbershop: true;
		};
	}>;
}

export const BookingItem = ({ booking }: BookingItemProps) => {

	const {status} = useSession();
	
	const isBookingPast = isPast(booking.date);

	const [isSheetOpen, setIsSheetOpen] = React.useState(false);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isConfirming, setIsConfirming] = React.useState(false);
	const [submitIsLoading, setSubmitIsLoading] = React.useState(false);

	const handleOpenConfirm = () => {
		setIsConfirming(true);
	};
	
	const handleCancelBooking = async () => {
		setSubmitIsLoading(true);
		setIsSheetOpen(false);
		try {
			await CancelBooking(booking.id);

			setIsConfirming(false);
			setIsModalOpen(true);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitIsLoading(false);
		}
	};

	if (status === 'loading') {
		return (
			<div>
				<BookingItemSkeleton />
			</div>
		);
	}
	
	return (
		<>
			<Sheet open={isSheetOpen}	onOpenChange={setIsSheetOpen}>
				<SheetTrigger asChild>
					<button className='min-w-full'>
						<Card>
							<CardContent className={isBookingPast ? 'flex p-0 grayscale' : 'flex p-0'}>
								<div className='flex flex-[3] items-start flex-col gap-2 py-5 px-8'>
									<Badge 
										className='bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit'>
										{isBookingPast ? 'Finalizado' : 'Confirmado'}
									</Badge>

									<h2 className='text-lg font-bold sm:text-xs 2md:text-lg'>{booking.service.name}</h2>
									
									<div className='flex items-center gap-2 text-center'>
										<Avatar className='size-8'>
											<AvatarImage src={booking.barbershop.imageUrl} />
											<AvatarFallback>N/A</AvatarFallback>
										</Avatar>

										<h3 className='text-base sm:text-xs 2md:text-base'>{booking.barbershop.name}</h3>
									</div>
								</div>

								<div className='flex flex-[1] flex-col gap-1 items-center justify-center border-l border-secondary p-5'>
									<p className='capitalize'>
										{format(booking.date, 'MMMM', {
											locale: ptBR
										})}
									</p>
									
									<p className='text-4xl'>
										{format(booking.date, 'dd')}
									</p>
									
									<p>
										{format(booking.date, 'HH:mm')}
									</p>
								</div>
							</CardContent>
						</Card>
					</button>
				</SheetTrigger>

				<SheetContent className='p-0'>
					<SheetHeader className='p-5 text-left border-b border-secondary'>
						<h2 className='text-lg font-bold'>Detalhes da Reserva</h2>
					</SheetHeader>

					<div className={isBookingPast ? 'px-5 pt-6 flex flex-col gap-6 grayscale' : 'px-5 pt-6 flex flex-col gap-6'}>
						<div className='relative w-full h-48 overflow-hidden cursor-default group rounded-b-2xl'>
							<Image 
								fill 
								sizes='100%'
								src={'/fswbackground-map.png'} 
								alt='Mapa do local da reserva'
								className='object-cover transition-all group-hover:scale-125 group-hover:transition-all'
							/>

							<div className='absolute flex items-end w-full h-full px-5 bg-gradient-to-t from-transparent to-background'>
								<Card className='mx-auto mb-4 w-fit h-fit'>
									<CardContent className='flex items-center justify-center gap-4 p-2'>
										<Avatar className='size-8 md:size-12'>
											<AvatarImage src={booking.barbershop.imageUrl ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
										</Avatar>
										
										<div className='flex flex-col'>
											<h3 className='text-base font-bold text-white md:text-lg'>{booking.barbershop.name}</h3>
											<p className='text-xs text-gray-400 md:text-sm'>{booking.barbershop.address}</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						<div className='flex flex-col gap-4'>
							<Badge 
								className='bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit'>
								{isBookingPast ? 'Finalizado' : 'Confirmado'}
							</Badge>

							<Card>
								<CardContent className='flex flex-col gap-4 px-2 py-4'>
									<div className='flex items-center justify-between'>
										<h2 className='font-bold'>{booking.service.name}</h2>

										<h3 
											className='text-sm font-bold uppercase'>
											{Intl.NumberFormat(
												'pt-BR',
												{
													style: 'currency',
													currency: 'BRL',
												}
											).format(Number(booking.service.price))}
										</h3>	
									</div>

									<div className='flex items-center justify-between'>
										<h3 className='text-gray-400'>Data</h3>

										<p className='flex gap-1 capitalize'>
											{format(booking.date, 'dd', {
												locale: ptBR,
											})}

											<span className='normal-case'>de</span>

											{format(booking.date, 'MMMM', {
												locale: ptBR,
											})}
										</p>
									</div>
									
									<div className='flex items-center justify-between'>
										<h3 className='text-gray-400'>Horário</h3>

										<p>{format(booking.date, 'HH:mm')}</p>
									</div>

									<div className='flex items-center justify-between'>
										<h3 className='text-gray-400'>Barbearia</h3>

										<p>{booking.barbershop.name}</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<SheetFooter className='absolute bottom-0 w-full gap-2 p-5'>
						<SheetClose asChild>
							<Button 
								variant={'secondary'}
								className='w-full'>
								Voltar
							</Button>
						</SheetClose>

						<Button 
							variant={'destructive'}
							onClick={handleOpenConfirm}
							className={isBookingPast ? 'hidden' : 'w-full'}>
							Cancelar reserva
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>

			<Dialog open={isConfirming} onOpenChange={setIsConfirming}>
				<DialogContent className='flex flex-col items-center justify-center border-none rounded-lg w-fit'>
					<DialogHeader className='space-y-4'>
						<DialogTitle className='text-center capitalize'>Cancelar Reserva</DialogTitle>
						<DialogDescription className='text-center text-gray-400'>
							Tem certeza que deseja cancelar esse agendamento? <br /> Essa ação não poderá ser desfeita.
						</DialogDescription>
					</DialogHeader>

					<div className='flex justify-between w-full gap-4'>
						<DialogClose asChild>
							<Button 
								variant={'secondary'}
								className='flex items-center justify-center w-full gap-2 font-bold min-w-32'>
								Voltar
							</Button>
						</DialogClose>

						<Button 
							variant={'destructive'}
							onClick={handleCancelBooking}
							className='flex items-center justify-center w-full gap-2 font-bold min-w-32'
							disabled={submitIsLoading}>
							{submitIsLoading ? (
								<p className='flex items-center justify-center gap-1'>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Carregando...
								</p>
							) : (
								<p>Cancelar</p>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='flex flex-col justify-center items-center gap-4 w-fit border-none rounded-3xl data-[state=open]:backdrop-blur-md'>
					<FaCircleCheck className='w-20 h-20 my-2 text-primary' />
					<h2 className='text-lg font-bold'>Reserva Cancelada!</h2>
					<p className='text-sm text-center text-gray-400'>Sua reserva foi cancelada com sucesso.</p>
				</DialogContent>
			</Dialog>
		</>
	);
};
