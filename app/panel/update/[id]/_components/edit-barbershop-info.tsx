'use client';

import Image from 'next/image';
import { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PatternFormat } from 'react-number-format';
 
import { Prisma } from '@prisma/client';

import { UploadButton } from '@/utils/uploadthing';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Textarea } from '@/app/_components/ui/textarea';
import { Separator } from '@/app/_components/ui/separator';
import { Loader2 } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { redirect } from 'next/navigation';

interface BarbershopDataProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      user: true;
    };
  }>
}

const BarbershopDataSchema = z.object({
	name: z.string()
		.min(3, 'Nome da barbearia deve ter no mínimo 3 caracteres')
		.max(30, 'Nome da barbearia deve ter no máximo 30 caracteres')
		.transform(name => {
			return name.trim().split(' ').map(word => {
				return word[0].toUpperCase().concat(word.substring(1));
			}).join(' ');
		})
		.optional(),

	address: z.string()
		.min(3, 'Endereço da barbearia deve ter no mínimo 3 caracteres')
		.optional(),

	about: z.string()
		.min(3, 'Sobre a barbearia deve ter no mínimo 3 caracteres')
		.max(400, 'Sobre a barbearia deve ter no máximo 400 caracteres')
		.optional(),
		
	imageUrl: z.string()
		.optional(),

	phone1: z.string()
		.min(11, 'Telefones devem ter no mínimo 11 caracteres')
		.optional(),
	
	phone2: z.string()
		.min(11, 'Telefones devem ter no mínimo 11 caracteres')
		.optional(),
});

type BarbershopData = z.infer<typeof BarbershopDataSchema>;

export const EditBarbershopInfo = ({ barbershop }: BarbershopDataProps) => {

	const [fileUrl, setFileUrl] = useState('');
	const [submitIsLoading, setSubmitIsLoading] = useState(false);
	const [isCreatedSuccessfully, setIsCreatedSuccessfully] = useState(false);

	const form = useForm<BarbershopData>({
		resolver: zodResolver(BarbershopDataSchema),
	});

	async function updateBarbershop(data: BarbershopData) {
		setSubmitIsLoading(true);
		try {
			await fetch('/panel/update/actions/update-barbershop', {
				method: 'PUT',
				body: JSON.stringify({
					barbershopId: barbershop.id,
					...data,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			setIsCreatedSuccessfully(true);
		} catch (error) {
			console.error('Error creating barbershop', error);
		}
		setSubmitIsLoading(false);
	}

	if (isCreatedSuccessfully) {
		return redirect('/panel');
	}
  
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(updateBarbershop)}>

					<div className='flex flex-col 2lg:flex-row 2sm:gap-6'>
						<div className='flex flex-col justify-between 2lg:pr-6 space-y-4 2lg:border-r 2lg:border-secondary 2lg:min-w-[512px]'>
							<div className='relative size-full min-h-60'>
								<Image 
									fill
									sizes='100%'
									src={fileUrl ? fileUrl : barbershop.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
									alt={form.watch('name') || 'Barbearia'} 
									className='object-cover rounded-lg'
								/>
							</div>

							<FormField
								control={form.control}
								name="imageUrl"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<UploadButton 
												className='rounded-lg ut-allowed-content:hidden ut-button:bg-secondary ut-button:w-full ut-button:hover:bg-primary ut-button:transition-all ut-button:hover:transition-all'
												endpoint='imageUploader'
												onClientUploadComplete={(file) => {
													setFileUrl(file[0].url);
													form.setValue('imageUrl', file[0].url);
												}}
												onUploadError={(error) => {
													console.error('Error uploading image', error);
												}}
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-sm tracking-tight text-red-600' />
									</FormItem>
								)}
							/>
						</div>

						<Separator orientation='horizontal' className='2lg:hidden w-full h-[1px] bg-secondary my-6' />

						<div className='flex flex-col w-full gap-4'>
							<div className='flex flex-row flex-wrap justify-between gap-4'>

								<div className='grow sm:min-w-72'>
									<label className='text-sm font-bold text-gray-400'>Nome da barbearia:</label>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input 
														placeholder='Nome da barbearia'
														defaultValue={barbershop.name}
														className='p-2 text-white rounded-md bg-secondary'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grow sm:min-w-72'>
									<label className='text-sm font-bold text-gray-400'>Endereço:</label>
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input 
														placeholder='Endereço da barbearia'
														defaultValue={barbershop.address}
														className='p-2 text-white rounded-md bg-secondary'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div>
								<label className='text-sm font-bold text-gray-400'>Sobre a barbearia:</label>
								<FormField
									control={form.control}
									name="about"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea 
													placeholder='Sobre a barbearia'
													defaultValue={barbershop.about}
													maxLength={400}
													className='p-2 text-white rounded-md bg-secondary min-h-44 max-h-56'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
					
							<div className='flex flex-row flex-wrap justify-between gap-4'>

								<div className='grow sm:min-w-72'>
									<label className='text-sm font-bold text-gray-400'>Telefone 1:</label>
									<FormField
										control={form.control}
										name="phone1"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<PatternFormat
														format='(##) #####-####'
														placeholder='(99) 99999-9999'
														autoComplete='tel-national'
														defaultValue={barbershop.phone1}
														customInput={Input}
														className='p-2 text-white rounded-md bg-secondary'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grow sm:min-w-72'>
									<label className='text-sm font-bold text-gray-400'>Telefone 2:</label>
									<FormField
										control={form.control}
										name="phone2"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<PatternFormat
														format='(##) #####-####'
														placeholder='(99) 99999-9999'
														autoComplete='tel-national'
														defaultValue={barbershop.phone2}
														customInput={Input}
														className='p-2 text-white rounded-md bg-secondary'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</div>

					<Separator orientation='horizontal' className='w-full h-[1px] bg-secondary my-6' />

					<div className='flex justify-center w-2/6 mx-auto'>
						<Button 
							type="submit"
							className='w-full px-8 font-bold uppercase'
							disabled={submitIsLoading}>
							{submitIsLoading ? (
								<p className='flex items-center justify-center gap-1'>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Carregando...
								</p>
							) : (
								<p>Atualizar</p>
							)}
						</Button>
					</div>

				</form>
			</Form>
		</>
	);
};
