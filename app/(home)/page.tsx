import React from 'react';

import { Header } from '../_components/header';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search } from './_components/search';

export default function Home() {
	return (
		<>
			<Header />

			<div className='flex flex-col gap-2 px-5 pt-5'>
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

			<div className='px-5 max-w-xl mt-6'>
				<Search />
			</div>
		</>
	);
}
