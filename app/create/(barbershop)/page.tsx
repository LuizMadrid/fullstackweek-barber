'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PatternFormat } from 'react-number-format';

import { ChevronLeft, Loader2 } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { UploadButton } from '@/utils/uploadthing';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { Textarea } from '@/app/_components/ui/textarea';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Dialog, DialogContent } from '@/app/_components/ui/dialog';
import { FaCircleCheck } from 'react-icons/fa6';

const BarbershopDataSchema = z.object({
	name: z.string()
		.min(3, 'Nome da barbearia deve ter no mínimo 3 caracteres')
		.max(30, 'Nome da barbearia deve ter no máximo 30 caracteres')
		.transform(name => {
			return name.trim().split(' ').map(word => {
				return word[0].toUpperCase().concat(word.substring(1));
			}).join(' ');
		}),

	address: z.string()
		.min(3, 'Endereço da barbearia deve ter no mínimo 3 caracteres'),

	about: z.string()
		.min(3, 'Sobre a barbearia deve ter no mínimo 3 caracteres')
		.max(400, 'Sobre a barbearia deve ter no máximo 400 caracteres')
		.optional(),
		
	imageUrl: z.string()
		.optional(),

	phone1: z.string()
		.min(11, 'Telefones devem ter no mínimo 11 caracteres'),
	
	phone2: z.string()
		.min(11, 'Telefones devem ter no mínimo 11 caracteres'),
});

type BarbershopData = z.infer<typeof BarbershopDataSchema>;

const CreateBarbershopScreen = () => {

	const [fileUrl, setFileUrl] = useState('');
	const [isCreatedSuccessfully, setIsCreatedSuccessfully] = useState(false);
	const [submitIsLoading, setSubmitIsLoading] = React.useState(false);

	const form = useForm<BarbershopData>({
		resolver: zodResolver(BarbershopDataSchema),
	});

	async function createUser(data: BarbershopData,) {
		setSubmitIsLoading(true);
		try {
			await fetch('create/actions/create-barbershop', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			setIsCreatedSuccessfully(true);
		} catch (error) {
			console.error('Error creating barbershop in page', error);
		}
	}

	const handleCloseDialog = () => {
		setIsCreatedSuccessfully(true);
	};

	return (
		<div className='flex flex-col items-center justify-center h-full gap-6'>

			<Link  href='/' passHref className='absolute top-4 left-4'>
				<Button 
					variant={'ghost'}
					className='flex gap-2 hover:bg-secondary/70'>
					<ChevronLeft size={16} />
					Página Inicial
				</Button>
			</Link>

			<Card className='mt-[20%] lg:mt-0'>
				<CardContent className='p-5 lg:min-w-[50vw] space-y-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(createUser)}
							className='space-y-4'>

							<div className='flex flex-col gap-4 lg:flex-row'>
								<div className='flex-[1] flex flex-col justify-between gap-4'>
									<div className='relative h-full overflow-hidden rounded-lg min-h-24'>
										<Image 
											fill
											src={fileUrl || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
											alt={form.watch('name') || 'Barbearia'} 
											className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
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
												<FormMessage className='text-red-600 text-sm tracking-tight' />
											</FormItem>
										)}
									/>
								</div>

								<Separator 
									orientation='horizontal' 
									className='lg:hidden w-full h-[1px] bg-border'
								/>
							
								<div className='flex-[2] space-y-4'>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input 
														placeholder='Nome da barbearia' 
														className='p-2 text-white rounded-md bg-secondary'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input 
														placeholder='Endereço da barbearia' 
														className='p-2 text-white rounded-md bg-secondary'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="about"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Textarea 
														placeholder='Sobre a barbearia'
														maxLength={400}
														className='p-2 text-white rounded-md bg-secondary min-h-32'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className='flex justify-between gap-2'>
										<div className='flex-1'>
											<label className='font-bold text-xs tracking-tight'>Telefone 1:</label>
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
																customInput={Input}
																className='p-2 text-white rounded-md bg-secondary'
																{...field}
															/>
														</FormControl>
														<FormMessage className='text-red-600 text-sm tracking-tight' />
													</FormItem>
												)}
											/>
										</div>

										<div className='flex-1'>
											<label className='font-bold text-xs tracking-tight'>Telefone 2:</label>
											<FormField
												control={form.control}
												name="phone2"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<PatternFormat
																format='(##) #####-####'
																placeholder='(99) 99292-9292'
																autoComplete='tel-national'
																customInput={Input}
																className='p-2 text-white rounded-md bg-secondary'
																{...field}
															/>
														</FormControl>
														<FormMessage className='text-red-600 text-sm tracking-tight' />
													</FormItem>
												)}
											/>
										</div>
									</div>
									
								</div>
							</div>

							<Button 
								type="submit"
								className='px-8 font-bold uppercase'
								disabled={submitIsLoading}>
								{submitIsLoading ? (
									<p className='flex items-center justify-center gap-1'>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Carregando...
									</p>
								) : (
									<p>Criar</p>
								)}
							</Button>
						</form>
					</Form>

				</CardContent>
			</Card>

			

			<Dialog open={isCreatedSuccessfully} onOpenChange={handleCloseDialog}>
				<DialogContent className='flex flex-col justify-center items-center gap-4 w-fit border-none rounded-3xl data-[state=open]:backdrop-blur-md'>
					<FaCircleCheck className='w-20 h-20 my-2 text-primary' />
					<h2 className='text-lg font-bold'>Barbearia criada com Sucesso!</h2>
					<p className='text-sm text-center text-gray-400'>
						Todas as informações foram salvas com sucesso.
						<br />
						Você pode editar as informações a qualquer momento.
					</p>

					<Link href={'/'} className='w-full' passHref>
						<Button className='w-full uppercase'>
						Ok
						</Button>
					</Link>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateBarbershopScreen;