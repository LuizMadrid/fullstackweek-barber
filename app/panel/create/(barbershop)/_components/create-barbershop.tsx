'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PatternFormat } from 'react-number-format';

import { Loader2 } from 'lucide-react';

import { UploadButton } from '@/utils/uploadthing';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Textarea } from '@/app/_components/ui/textarea';
import { Separator } from '@/app/_components/ui/separator';
import { Dialog } from '@/app/_components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/app/_components/ui/form';
import { SignInDialog } from '@/app/_components/signin-dialog';
import { redirect } from 'next/navigation';

const BarbershopDataSchema = z.object({
	name: z
		.string({ required_error: 'O nome da barbearia é obrigatório' })
		.min(3, 'Nome da barbearia deve ter no mínimo 3 caracteres')
		.max(30, 'Nome da barbearia deve ter no máximo 30 caracteres')
		.transform((name) => {
			return name
				.trim()
				.split(' ')
				.map((word) => {
					return word[0].toUpperCase().concat(word.substring(1));
				})
				.join(' ');
		}),

	street: z
		.string({ required_error: 'A rua da barbearia é obrigatória' })
		.min(3, 'Rua da barbearia deve ter no mínimo 3 caracteres'),

	number: z
		.string({ required_error: 'O número da barbearia é obrigatório' })
		.min(1, 'Número da barbearia deve ser informado'),

	about: z
		.string()
		.min(3, 'Sobre a barbearia deve ter no mínimo 3 caracteres')
		.max(400, 'Sobre a barbearia deve ter no máximo 400 caracteres')
		.optional(),

	imageUrl: z
		.string({ required_error: 'A imagem é obrigatória' })
		.min(1, 'A imagem é obrigatória'),

	phone1: z.string({ required_error: 'O telefone 1 é obrigatório' }).min(11, 'Telefones devem ter no mínimo 11 caracteres'),

	phone2: z.string({ required_error: 'O telefone 2 é obrigatório' }).min(11, 'Telefones devem ter no mínimo 11 caracteres'),
});

type BarbershopData = z.infer<typeof BarbershopDataSchema>;

export const CreateBarbershop = () => {
	const [fileUrl, setFileUrl] = useState('');
	const [isCreatedSuccessfully, setIsCreatedSuccessfully] = useState(false);
	const [submitIsLoading, setSubmitIsLoading] = useState(false);
	const { status } = useSession();

	const form = useForm<BarbershopData>({
		resolver: zodResolver(BarbershopDataSchema),
	});

	async function createUser(data: BarbershopData) {
		setSubmitIsLoading(true);
		try {
			await fetch('/panel/create/actions/create-barbershop', {
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

	if (status === 'unauthenticated') {
		return (
			<Dialog open={true} onOpenChange={() => {}}>
				<SignInDialog />
			</Dialog>
		);
	}

	if (isCreatedSuccessfully) {
		return redirect('/panel');
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(createUser)}>
					<div className="flex flex-col 2lg:flex-row 2sm:gap-6">
						<div className="flex flex-col justify-between 2lg:pr-6 space-y-4 2lg:border-r 2lg:border-secondary 2lg:min-w-[512px]">
							<div className="relative size-full min-h-60">
								<Image
									fill
									sizes="100%"
									src={
										fileUrl ||
                    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
									}
									alt={form.watch('name') || 'Barbearia'}
									className="object-cover rounded-lg"
								/>
							</div>

							<FormField
								control={form.control}
								name="imageUrl"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<UploadButton
												className="rounded-lg ut-allowed-content:hidden ut-button:bg-secondary ut-button:w-full ut-button:hover:bg-primary ut-button:transition-all ut-button:hover:transition-all"
												endpoint="imageUploader"
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
										<FormMessage className="text-sm tracking-tight text-red-600" />
									</FormItem>
								)}
							/>
						</div>

						<Separator
							orientation="horizontal"
							className="2lg:hidden w-full h-[1px] bg-secondary my-6"
						/>

						<div className="flex flex-col w-full gap-4">
							<div className="flex flex-row flex-wrap justify-between gap-4">
								<div className="grow sm:min-w-72">
									<label className="text-sm font-bold text-gray-400">
										<span className="text-red-500">*</span> Nome da barbearia:
									</label>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Nome da barbearia"
														className="p-2 text-white rounded-md bg-secondary"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grow sm:min-w-72">
									<label className="text-sm font-bold text-gray-400">
										<span className="text-red-500">*</span> Rua:
									</label>
									<FormField
										control={form.control}
										name="street"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Rua da barbearia"
														className="p-2 text-white rounded-md bg-secondary"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grow sm:min-w-72">
									<label className="text-sm font-bold text-gray-400">
										<span className="text-red-500">*</span> Número:
									</label>
									<FormField
										control={form.control}
										name="number"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Número da barbearia"
														className="p-2 text-white rounded-md bg-secondary"
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
								<label className="text-sm font-bold text-gray-400">
                  Sobre a barbearia:
								</label>
								<FormField
									control={form.control}
									name="about"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea
													placeholder="Sobre a barbearia"
													maxLength={400}
													className="p-2 text-white rounded-md bg-secondary min-h-44 max-h-56"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-row flex-wrap justify-between gap-4">
								<div className="grow sm:min-w-72">
									<label className="text-sm font-bold text-gray-400">
										<span className="text-red-500">*</span> Telefone 1:
									</label>
									<FormField
										control={form.control}
										name="phone1"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<PatternFormat
														format="(##) #####-####"
														placeholder="(99) 99999-9999"
														autoComplete="tel-national"
														customInput={Input}
														className="p-2 text-white rounded-md bg-secondary"
														{...field}
													/>
												</FormControl>
												<FormMessage className="text-sm tracking-tight text-red-600" />
											</FormItem>
										)}
									/>
								</div>

								<div className="grow sm:min-w-72">
									<label className="text-sm font-bold text-gray-400">
										<span className="text-red-500">*</span> Telefone 2:
									</label>
									<FormField
										control={form.control}
										name="phone2"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<PatternFormat
														format="(##) #####-####"
														placeholder="(99) 99292-9292"
														autoComplete="tel-national"
														customInput={Input}
														className="p-2 text-white rounded-md bg-secondary"
														{...field}
													/>
												</FormControl>
												<FormMessage className="text-sm tracking-tight text-red-600" />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</div>

					<Separator
						orientation="horizontal"
						className="w-full h-[1px] bg-secondary my-6"
					/>

					<div className="flex justify-center w-2/6 mx-auto">
						<Button
							type="submit"
							className="w-full px-8 font-bold uppercase"
							disabled={submitIsLoading}
						>
							{submitIsLoading ? (
								<p className="flex items-center justify-center gap-1">
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Carregando...
								</p>
							) : (
								<p>Criar</p>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
