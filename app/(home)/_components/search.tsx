'use client';

import React from 'react';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';

import { SearchIcon } from 'lucide-react';

export const Search = () => {
	return (
		<>
			<div className='flex justify-between items-center gap-4'>
				<Input placeholder='Pesquise por uma barbearia...' />
				<Button variant='default' >
					<SearchIcon size={18} />
				</Button>
			</div>
		</>
	);
};
