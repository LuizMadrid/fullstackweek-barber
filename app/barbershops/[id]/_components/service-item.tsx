'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { ptBR } from 'date-fns/locale';
import { format, setHours, setMinutes } from 'date-fns';

import { saveBooking } from './actions/save-booking';
import { generateDayTimeList } from './helpers/hours';
import { getDayBookings } from './actions/get-day-bookings';
import { Service, Barbershop, Booking } from '@prisma/client';

import { Button } from '@/app/_components/ui/button';
import { Calendar } from '@/app/_components/ui/calendar';
import { Card, CardContent } from '@/app/_components/ui/card';
import { SignInDialog } from '@/app/_components/signin-dialog';
import {
	Dialog,
	DialogClose,
	DialogContent,
} from '@/app/_components/ui/dialog';
import { BarbershopServiceItemSkeleton } from '@/app/_components/skeletons/skeleton';
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/app/_components/ui/sheet';

import { Loader2 } from 'lucide-react';
import { FaCircleCheck } from 'react-icons/fa6';

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuth?: boolean;
}

export const ServiceItem = ({
	barbershop,
	service,
	isAuth,
}: ServiceItemProps) => {
	const { data, status } = useSession();

	const [date, setDate] = React.useState<Date | undefined>(undefined);
	const [hour, setHour] = React.useState<string | undefined>();

	const [isSheetOpen, setIsSheetOpen] = React.useState(false);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isUserAuth, setUserAuth] = React.useState(false);
	const [submitIsLoading, setSubmitIsLoading] = React.useState(false);
	const [haveDayBookings, setHaveDayBookings] = React.useState<Booking[]>([]);

	const handleReserveService = () => {
		if (!isAuth) {
			setUserAuth(true);
			return;
		}
		setIsSheetOpen(true);
	};

	const timeList = useMemo(() => {
		if (!date) {
			return [];
		}

		const now = new Date(); // data atual do dispositivo do usuário.

		return generateDayTimeList(date).filter((time) => {
			const timeHour = Number(time.split(':')[0]);
			const timeMinute = Number(time.split(':')[1]);

			// se a data for a data atual e o horário for anterior ao horário atual, vai removê-lo da lista. (implementação minha)
			if (
				date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
			) {
				if (
					now.getHours() > timeHour ||
          (now.getHours() === timeHour && now.getMinutes() > timeMinute)
				) {
					return false;
				}
			}

			const booking = haveDayBookings.find((booking) => {
				const bookingHour = booking.date.getHours();
				const bookingMinute = booking.date.getMinutes();

				return bookingHour === timeHour && bookingMinute === timeMinute;
			});

			if (!booking) {
				return true;
			}

			return false;
		});
	}, [date, haveDayBookings]);

	const handleSelectHour = useCallback((time: string) => {
		setHour(time);
	}, []);

	const handleSelectDate = useCallback((date: Date | undefined) => {
		setDate(date);
		setHour(undefined);
	}, []);

	useEffect(() => {
		if (!date) {
			return;
		}

		const refreshAvailableHours = async () => {
			const dayBookings = await getDayBookings(barbershop.id, date);

			setHaveDayBookings(dayBookings);
		};

		refreshAvailableHours();
	}, [date, barbershop.id]);

	const handleBookingSubmit = async () => {
		setSubmitIsLoading(true);
		try {
			if (!date || !hour || !data?.user) {
				return;
			}

			const dateHour = Number(hour.split(':')[0]);
			const dateMinute = Number(hour.split(':')[1]);

			const selectedDate = setMinutes(setHours(date, dateHour), dateMinute);

			await saveBooking({
				serviceId: service.id,
				barbershopId: barbershop.id,
				date: selectedDate,
				userId: (data?.user as any).id,
			});

			setIsSheetOpen(false);
			setIsModalOpen(true);
			setDate(undefined);
			setHour(undefined);
		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => {
				setSubmitIsLoading(false);
			}, 4000);
		}
	};

	if (status === 'loading') {
		return (
			<div>
				<BarbershopServiceItemSkeleton />
			</div>
		);
	}

	return (
		<Card className="flex items-center gap-3 p-3 group">
			<div className="flex flex-[2] size-32 relative overflow-hidden rounded-lg">
				<Image
					width={128}
					height={128}
					src={service.imageUrl}
					alt={service.name}
					className="object-fill transition-all group-hover:scale-105 group-hover:transition-all"
				/>
			</div>

			<div className="flex flex-[4] flex-col justify-between gap-1">
				<h2 className="font-bold tracking-tight">{service.name}</h2>
				<p className="text-sm text-gray-400">{service.description}</p>

				<div className="flex items-center justify-between mt-2">
					<span className="text-sm font-bold uppercase text-primary">
						{Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(Number(service.price))}
					</span>

					<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
						<Button
							variant={'secondary'}
							onClick={handleReserveService}
							className="font-bold transition-all hover:bg-primary hover:transition-all"
						>
              Reservar
						</Button>

						<SheetContent className="p-0">
							<SheetHeader className="p-5 text-left border-b border-secondary">
								<SheetTitle>Fazer Reserva</SheetTitle>
							</SheetHeader>

							<div className="py-2 border-b border-secondary">
								<Calendar
									mode="single"
									selected={date}
									onSelect={handleSelectDate}
									locale={ptBR}
									fromDate={new Date()}
								/>
							</div>

							{date && (
								<div className="flex gap-3 overflow-x-auto py-6 px-5 border-b border-secondary [&::-webkit-scrollbar]:hidden">
									{timeList.length > 0 ? (
										timeList.map((time, index) => (
											<Button
												key={index}
												onClick={() => handleSelectHour(time)}
												variant={hour === time ? 'default' : 'outline'}
												className="text-sm font-bold rounded-full"
											>
												{time}
											</Button>
										))
									) : (
										<p className="text-gray-400 uppercase text-center mx-auto py-2">
                      Sem datas disponíveis!
										</p>
									)}
								</div>
							)}

							{date && (
								<Card className="m-6">
									<CardContent className="flex flex-col gap-4 px-2 py-4">
										<div className="flex items-center justify-between">
											<h2 className="font-bold">{service.name}</h2>

											<h3 className="text-sm font-bold uppercase">
												{Intl.NumberFormat('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												}).format(Number(service.price))}
											</h3>
										</div>

										<div className="flex items-center justify-between">
											<h3 className="text-gray-400">Data</h3>

											<p className="flex gap-1 capitalize">
												{format(date, 'dd', {
													locale: ptBR,
												})}

												<span className="normal-case">de</span>

												{format(date, 'MMMM', {
													locale: ptBR,
												})}
											</p>
										</div>

										<div className="flex items-center justify-between">
											<h3 className="text-gray-400">Horário</h3>

											{hour ? <p>{hour}</p> : <p>Selecione um Horário</p>}
										</div>

										<div className="flex items-center justify-between">
											<h3 className="text-gray-400">Barbearia</h3>

											<p>{barbershop.name}</p>
										</div>
									</CardContent>
								</Card>
							)}

							<SheetFooter className="absolute bottom-0 w-full p-5">
								<Button
									onClick={handleBookingSubmit}
									className="w-full"
									disabled={!date || !hour || submitIsLoading}
								>
									{submitIsLoading ? (
										<p className="flex items-center justify-center gap-1">
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Carregando...
										</p>
									) : (
										<p>Confirmar</p>
									)}
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>

					<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
						<DialogContent className="flex flex-col justify-center items-center gap-4 w-fit border-none rounded-3xl data-[state=open]:backdrop-blur-md">
							<FaCircleCheck className="w-20 h-20 my-2 text-primary" />
							<h2 className="text-lg font-bold">Reserva Efetuada!</h2>
							<p className="text-sm text-center text-gray-400">
                Sua reserva foi agendada com sucesso.
							</p>

							<DialogClose asChild>
								<Button
									variant={'secondary'}
									className="w-full font-bold transition-all hover:bg-primary hover:transition-all"
								>
                  Confirmar
								</Button>
							</DialogClose>
						</DialogContent>
					</Dialog>

					<Dialog open={isUserAuth} onOpenChange={setUserAuth}>
						<SignInDialog />
					</Dialog>
				</div>
			</div>
		</Card>
	);
};
