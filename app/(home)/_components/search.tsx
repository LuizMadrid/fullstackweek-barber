'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { SearchSkeleton } from '@/app/_components/skeletons/skeleton';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/app/_components/ui/form';

import { SearchIcon } from 'lucide-react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const searchSchema = z.object({
	search: z
		.string({
			required_error: 'Campo obrigatório.',
		})
		.trim()
		.min(1, 'Digite algo para buscar'),
});

interface SearchProps {
  defaultSearch?: z.infer<typeof searchSchema>;
}

export const Search = ({ defaultSearch }: SearchProps) => {
	const router = useRouter();
	const { status } = useSession();

	const form = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
		defaultValues: defaultSearch,
	});

	const handleSubmit = (data: z.infer<typeof searchSchema>) => {
		router.push(`/barbershops?search=${data.search}`);
	};

	if (status === 'loading') {
		return (
			<div>
				<SearchSkeleton />
			</div>
		);
	}

	return (
		<>
			<div>
				<Form {...form}>
					<form
						className="flex items-start justify-between gap-4 focus-visible:border-none"
						autoComplete="off"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<FormField
							control={form.control}
							name="search"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input
											placeholder="Buscar Barbearias"
											className="bg-secondary/50 border border-[#26272B]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button variant="default" className="px-3" type="submit">
							<SearchIcon size={18} />
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};
