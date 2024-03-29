import Image from 'next/image';

import { format } from 'date-fns';
import prisma from '../_lib/prisma';
import { ptBR } from 'date-fns/locale';

import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

import { Search } from './_components/search';
import { BookingItem } from '../_components/booking-item';
import { BarbershopItem } from './_components/barbershop-item';
import { WelcomeForUser } from './_components/welcome-user';

import { CarouselComponent } from '../_components/CarouselComponent';
import { CarouselItem } from '../_components/ui/carousel';

export default async function Home() {

	const session = await getServerSession(authOptions);
	
	const [barbershops, popularBarbershops, confirmedBookings] = await Promise.all([
		prisma.barbershop.findMany(),
		prisma.barbershop.findMany({
			orderBy: {
				id: 'asc',
			},
		}),
		
		session?.user ? await prisma.booking.findMany({
			where: {
				userId: (session?.user as any).id,
				date: {
					gte: new Date(),
				},
			},
			orderBy: {
				date: 'asc',
			},
			include: {
				service: true,
				barbershop: true,
			},
		}) : Promise.resolve([])
	]);

	return (
		<div className='flex flex-col gap-6'>
			<div className='relative lg:bg-background/60'>
				<Image 
					src='/background-fswbarber.jpeg' 
					alt={'imagem de fundo!'} 
					fill 
					sizes='100%'
					className='hidden object-cover object-left-top -z-10 lg:block lg:opacity-30'
				/>
					
				<div className='flex flex-col gap-12 2md:flex-row sm:pt-5 lg:py-16 lg:px-32'>

					<div className='flex flex-col justify-between space-y-4 flex-[4] 2md:max-w-[500px]'>
						<div className='space-y-8'>
							<div className='px-5 pt-5 space-y-2 sm:pt-0 lg:px-0'>

								<WelcomeForUser />

								<p className='flex gap-1 capitalize'>
									{format(new Date(), 'EEEE\',\' d', {
										locale: ptBR,
									})}
									<span className='normal-case'>de</span>
									{format(new Date(), 'MMMM', {
										locale: ptBR,
									})}
								</p>
							</div>

							<div className='px-5 lg:px-0'>
								<Search />
							</div>
						</div>


						{session?.user && (
							<div className='relative flex flex-col gap-2 px-5 lg:px-0'>
								<h2 className='text-lg text-gray-400 uppercase sm:text-sm'>Agendamentos confirmados</h2>

								<div>
									{confirmedBookings.length === 0 ? (
										<p className='text-center mt-5 uppercase text-gray-400 tracking-wide p-6 bg-background border border-secondary/70 rounded-lg'>Você não possui agendamentos confirmados.</p>
									) : (
										<>
											<CarouselComponent>
												{confirmedBookings.map((booking) => (
													<CarouselItem key={booking.id} className='basis-full'>
														<BookingItem booking={booking} />
													</CarouselItem>
												))}
											</CarouselComponent>
										</>
									)}
								</div>
							</div>
						)}
					</div>

					<div className='relative flex flex-[6] flex-col gap-2 min-w-80'>
						<h2 className='px-5 text-lg text-gray-400 uppercase lg:px-0 sm:text-sm'>Recomendados</h2>

						<div className='px-5 lg:px-0'>
							<CarouselComponent>
								{barbershops.map((barbershop:any) => (
									<CarouselItem key={barbershop.id} className='basis-48 sm:basis-60'>
										<BarbershopItem barbershop={barbershop} />
									</CarouselItem>
								))}
							</CarouselComponent>
						</div>
					</div>

				</div>
			</div>

			<div className='lg:pt-20 lg:px-32'>
				<div className='relative flex flex-col gap-2 min-w-80'>
					<h2 className='px-5 text-lg text-gray-400 uppercase lg:px-0 lg:text-white lg:font-bold lg:capitalize'>Populares</h2>

					<div className='px-5 lg:px-0'>
						<CarouselComponent>
							{popularBarbershops.map((barbershop:any) => (
								<CarouselItem key={barbershop.id} className='basis-48 sm:basis-60'>
									<BarbershopItem barbershop={barbershop} />
								</CarouselItem>
							))}
						</CarouselComponent>
					</div>
				</div>
			</div>
		</div>
	);
}
