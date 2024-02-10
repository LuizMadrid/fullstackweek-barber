import Image from 'next/image';

import { format } from 'date-fns';
import prisma from '../_lib/prisma';
import { ptBR } from 'date-fns/locale';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Search } from './_components/search';
import { Header } from '../_components/header';
import { BookingItem } from '../_components/booking-item';
import { BarbershopItem } from './_components/barbershop-item';
import { WelcomeForUser } from './_components/welcome-user';

import { ScrollArrowToRight } from '../_components/scroll-animate-arrow';

export default async function Home() {

	const session = await getServerSession(authOptions);
	
	const barbershops = await prisma.barbershop.findMany();
	
	return (
		<>
			<Header />

			<div className='flex flex-col gap-6'>
				<div className='relative lg:bg-background/60'>
					<Image src='/background-fswbarber.jpeg' layout='fill' alt={''} className='hidden object-cover object-left-top -z-10 lg:block lg:opacity-30' />
					<div className='flex flex-col gap-12 sm:flex-row sm:pt-5 lg:py-16 lg:px-32'>

						<div className='flex flex-col justify-between space-y-4 flex-[4]'>
							<div className='space-y-8'>
								<div className='space-y-2 px-5 pt-5 sm:pt-0 lg:px-0'>

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

								<div className='max-w-xl px-5 lg:px-0'>
									<Search />
								</div>
							</div>


							{session?.user && (
								<div className='flex flex-col max-w-xl gap-2 px-5 lg:px-0'>
									<h2 className='text-lg text-gray-400 uppercase sm:text-sm'>Agendamentos</h2>
									<BookingItem />
								</div>
							)}
						</div>

						<div className='relative flex flex-[6] flex-col gap-2 min-w-80'>
							<h2 className='px-5 lg:px-0 text-lg text-gray-400 uppercase sm:text-sm'>Recomendados</h2>

							<div className='flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-5 lg:px-0'>
								{barbershops.map((barbershop:any) => (
									<BarbershopItem key={barbershop.id} barbershop={barbershop} />
								))}
							</div>
							<ScrollArrowToRight className='hidden lg:block' />
						</div>

					</div>
				</div>

				<div className='lg:pt-20 lg:px-32'>
					<div className='relative flex flex-col gap-2 min-w-80'>
						<h2 className='px-5 lg:px-0 text-lg text-gray-400 uppercase sm:text-white sm:font-semibold sm:capitalize'>Populares</h2>

						<div className='flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-5 lg:px-0'>
							{barbershops.map((barbershop:any) => (
								<BarbershopItem key={barbershop.id} barbershop={barbershop} />
							))}
						</div>
						<ScrollArrowToRight className='hidden lg:block' />
					</div>
				</div>

			</div>
		</>
	);
}
