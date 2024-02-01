import React from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Search } from './_components/search';
import { Header } from '../_components/header';
import { BookingItem } from '../_components/booking-item';
import { BarbershopItem } from './_components/barbershop-item';
import { db } from '../_lib/prisma';

export default async function Home() {

	const barbershops = await db.barbershop.findMany();
	
	return (
		<>
			<Header />

			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2 pt-5 px-5'>
					<div className='flex gap-2 text-xl font-bold'>
						<span className='font-normal'>Olá,</span>
						<h2>&apos;nome do usuário&apos;!</h2>
					</div>
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

				<div className='max-w-xl px-5'>
					<Search />
				</div>

				<div className='flex flex-col gap-2 max-w-xl px-5'>
					<h2 className='text-lg uppercase text-gray-400'>Agendamentos</h2>
					<BookingItem />
				</div>

				<div className='flex flex-col gap-2 min-w-80'>
					<h2 className='text-lg uppercase text-gray-400 px-5'>Recomendados</h2>

					<div className='flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-5'>
						{barbershops.map((barbershop:any) => (
							<BarbershopItem key={barbershop.id} barbershop={barbershop} />
						))}
					</div>
				</div>

				<div className='flex flex-col gap-2 min-w-80'>
					<h2 className='text-lg uppercase text-gray-400 px-5'>Populares</h2>

					<div className='flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-5'>
						{barbershops.map((barbershop:any) => (
							<BarbershopItem key={barbershop.id} barbershop={barbershop} />
						))}
					</div>
				</div>

			</div>
		</>
	);
}
