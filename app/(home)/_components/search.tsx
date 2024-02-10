'use client';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';

import { SearchIcon } from 'lucide-react';

export const Search = () => {
	return (
		<>
			<div className='flex items-center justify-between gap-4'>
				<Input placeholder='Buscar Barbearias' className='bg-secondary/50 border border-[#26272B]' />
				<Button variant='default' className='px-3' >
					<SearchIcon size={18} />
				</Button>
			</div>
		</>
	);
};
