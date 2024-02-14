'use client';

import { useRouter } from 'next/navigation';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';

import { SearchIcon } from 'lucide-react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const searchSchema = z.object({
	search: z.string({
		required_error: 'Campo obrigatório.',
	}).trim().min(1, 'Digite algo para buscar'),
});

export const Search = () => {

	const router = useRouter();

	const form = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
	});

	const handleSubmit = (data: z.infer<typeof searchSchema>) => {
		router.push(`/barbershops?search=${data.search}`);
	};
	
	return (
		<>
			<div>
				<Form {...form}>
					<form className='flex items-start justify-between gap-4 focus-visible:border-none' autoComplete='off' onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name="search"
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<Input placeholder='Buscar Barbearias' className='bg-secondary/50 border border-[#26272B]' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button variant='default' className='px-3' type='submit' >
							<SearchIcon size={18} />
						</Button>

					</form>
				</Form>
			</div>
		</>
	);
};
