'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

import { format, setHours, setMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Service, Barbershop } from '@prisma/client';
import { SaveBooking } from '../_actions/save-booking';
import { generateDayTimeList } from '../_helpers/hours';

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/app/_components/ui/sheet';
import { Loader2 } from 'lucide-react';

interface ServiceItemProps {
	barbershop: Barbershop
	service: Service
	isAuth?: boolean
}

export const ServiceItem = ({ barbershop, service , isAuth }: ServiceItemProps) => {

	const {data} = useSession();

	const [date, setDate] = React.useState<Date | undefined>(undefined);
	const [hour, setHour] = React.useState<string | undefined>();
	const [submitIsLoading, setSubmitIsLoading] = React.useState(false);

	const handleReserveService = () => {
		if (!isAuth) {
			return signIn('google');
		}
	};

	const timeList = useMemo(() => {
		return date ? generateDayTimeList(date) : [];
	}, [date]);

	const handleSelectHour = (time: string) => {
		setHour(time);
	};

	const handleSelectDate = (date: Date | undefined) => {
		setDate(date);
		setHour(undefined);
	};

	const handleBookingSubmit = async () => {
		setSubmitIsLoading(true);
		try {
			if (!date || !hour || !data?.user) {
				return;
			}

			const dateHour = Number(hour.split(':')[0]);
			const dateMinute = Number(hour.split(':')[1]);

			const selectedDate = setMinutes(setHours(date, dateHour), dateMinute);

			await SaveBooking({
				serviceId: service.id,
				barbershopId: barbershop.id,
				date: selectedDate,
				userId: (data?.user as any).id,
			});

		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => {
				setSubmitIsLoading(false);
			}, 4000);
		}
	};
	
	return (
		<Card className='flex items-center gap-3 p-3 group max-w-md'>
			<div className='flex flex-[2] size-32 relative overflow-hidden rounded-lg'>
				<Image 
					fill
					src={service.imageUrl} 
					alt={service.name} 
					className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
				/>
			</div>

			<div className='flex flex-[4] flex-col justify-between gap-1'>
				<h2 className='font-bold tracking-tight'>{service.name}</h2>
				<p className='text-sm text-gray-400'>{service.description}</p>

				<div className='flex justify-between items-center mt-2'>
					<span 
						className='font-bold text-sm uppercase text-primary'>
						{Intl.NumberFormat(
							'pt-BR',
							{
								style: 'currency',
								currency: 'BRL',
							}
						).format(Number(service.price))}
					</span>	

					<Sheet>
						<SheetTrigger asChild>
							<Button 
								variant={'secondary'}
								onClick={handleReserveService}
								className='font-bold hover:bg-primary transition-all hover:transition-all'>
								Reservar
							</Button>
						</SheetTrigger>

						<SheetContent className='p-0'>
							<SheetHeader className='text-left p-5 border-b border-secondary'>
								<SheetTitle>
									Fazer Reserva
								</SheetTitle>
							</SheetHeader>

							<div className='py-2 border-b border-secondary'>
								<Calendar
									mode="single"
									selected={date}
									onSelect={handleSelectDate}
									locale={ptBR}
									fromDate={new Date()}
								/>
							</div>

							{date && (
								<div className='flex gap-3 overflow-x-auto py-6 px-5 border-b border-secondary [&::-webkit-scrollbar]:hidden'>
									{timeList.map((time, index) => (
										<Button 
											key={index}
											onClick={() => handleSelectHour(time)}
											className='text-sm font-bold rounded-full'
											variant={
												hour === time ? 'default' : 'outline'
											}>
											{time}
										</Button>
									))}
								</div>
							)}
							
							{date && (
								<Card className='m-6'>
									<CardContent className='flex flex-col gap-4 px-2 py-4'>
										<div className='flex justify-between items-center'>
											<h2 className='font-semibold'>{service.name}</h2>

											<h3 
												className='font-semibold text-sm uppercase'>
												{Intl.NumberFormat(
													'pt-BR',
													{
														style: 'currency',
														currency: 'BRL',
													}
												).format(Number(service.price))}
											</h3>	
										</div>

										<div className='flex justify-between items-center'>
											<h3 className='text-gray-400'>Data</h3>

											<p className='flex gap-1 capitalize'>
												{format(date, 'dd', {
													locale: ptBR,
												})}

												<span className='normal-case'>de</span>

												{format(date, 'MMMM', {
													locale: ptBR,
												})}
											</p>
										</div>
										
										<div className='flex justify-between items-center'>
											<h3 className='text-gray-400'>Horário</h3>

											{hour ? (
												<p>{hour}</p>
											) : (
												<p>Selecione um Horário</p>
											)}
										</div>

										<div className='flex justify-between items-center'>
											<h3 className='text-gray-400'>Barbearia</h3>

											<p>{barbershop.name}</p>
										</div>
									</CardContent>
								</Card>
							)}

							<SheetFooter className='absolute bottom-0 w-full p-5'>
								<Button 
									onClick={handleBookingSubmit}
									disabled={(!date || !hour) || submitIsLoading}>
									{submitIsLoading ? (
										<p className='flex justify-center items-center gap-1'>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Carregando...
										</p>
									) : (
										<p>Confirmar</p>
									)}
								</Button>
							</SheetFooter>

						</SheetContent>
					</Sheet>
				</div>
			</div>
		</Card> 
	);
};
