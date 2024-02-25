'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import { ChevronLeft } from 'lucide-react';

import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { Textarea } from '@/app/_components/ui/textarea';
import { Card, CardContent } from '@/app/_components/ui/card';
import { UploadButton } from '@/utils/uploadthing';

interface BarbershopData {
	name: string;
	address: string;
	about: string;
	imageUrl: string;
}

const CreateBarbershopScreen = () => {

	const [fileUrl, setFileUrl] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [showCompletionMessage, setShowCompletionMessage] = useState(false);
	const [barbershop, setBarbershop] = useState<BarbershopData>({
		name: '',
		address: '',
		about: '',
		imageUrl: ''
	});

	const handleContinueClick = () => {
		setShowForm(true);
	};

	const handleBackToWelcomeClick = () => {
		setShowForm(false);
		setShowCompletionMessage(false);
	};

	const handleInputChange = (event:any) => {
		setBarbershop({
			...barbershop,
			[event.target.id]: event.target.value
		});
	};
	
	async function create(data: BarbershopData,) {
		try {
			await fetch('create/actions/create-barbershop', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(() => setBarbershop({name: '', address: '', about: '', imageUrl: ''}));
		} catch (error) {
			console.error('Error creating barbershop in page', error);
		}
	}

	const handleSubmit = (data: BarbershopData) => {
		try {
			create(data);
		} catch (error) {
			console.error('Error creating barbershop in page', error);
		}

		setShowForm(false);
		setShowCompletionMessage(true);
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

			{!showForm && !showCompletionMessage && (
				<>
					<h1 className='text-7xl font-bold text-center font-mono tracking-tight text-transparent uppercase bg-gradient-to-b from-primary via-primary/40 to-primary/10 from-0% via-40% to-70% bg-clip-text'>Seja bem vindo!</h1>
					<p className='text-xl font-bold text-center text-gray-400'>Adicione informações sobre sua barbearia para que seus clientes possam te encontrar.</p>
					
					<Button 
						onClick={handleContinueClick}
						className='font-bold uppercase'>
						Continuar
					</Button>
				</>
			)}

			{showForm && (
				<Card>
					<CardContent className='p-5 lg:min-w-[50vw] space-y-4'>
						<form
							onSubmit={ 
								event => {
									event.preventDefault();
									handleSubmit(barbershop);
								}
							}
							className='space-y-4'>

							<div className='flex flex-col gap-4 lg:flex-row'>
								<div className='flex-[1] flex flex-col justify-between gap-4'>
									<div className='relative h-full overflow-hidden rounded-lg min-h-24'>
										<Image 
											fill
											src={fileUrl || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
											alt={barbershop.name} 
											className='object-cover transition-all group-hover:scale-105 group-hover:transition-all'
										/>
									</div>

									{/* <Input
										type='file'
										className='text-xs file:font-bold file:text-white'
										id="imageUrl" 
										value={barbershop.imageUrl} 
										onChange={handleInputChange}
									/> */}

									<UploadButton 
										className='rounded-lg ut-allowed-content:hidden ut-button:bg-secondary'
										endpoint='imageUploader'
										onClientUploadComplete={(file) => {
											setFileUrl(file[0].url);
											setBarbershop({
												...barbershop,
												imageUrl: file[0].url
											});
										}}
										onUploadError={(error) => {
											console.error('Error uploading image', error);
										}}
									/>

								</div>

								<Separator 
									orientation='horizontal' 
									className='lg:hidden w-full h-[1px] bg-border'
								/>
							
								<div className='flex-[2] space-y-4'>
									<Input 
										placeholder='Nome da barbearia'
										id="name" 
										value={barbershop.name} 
										onChange={handleInputChange} 
										className='p-2 text-white rounded-md bg-secondary'
									/>

									<Input 
										placeholder='Endereço da barbearia' 
										id="address" 
										value={barbershop.address} 
										onChange={handleInputChange} 
										className='p-2 text-white rounded-md bg-secondary'
									/>
					
									<Textarea 
										placeholder='Sobre a barbearia'
										id="about" 
										value={barbershop.about} 
										onChange={handleInputChange}
										className='p-2 text-white rounded-md bg-secondary min-h-32'
									/>

									{/* <Input 
										placeholder='Url da imagem'
										id="imageUrl" 
										value={barbershop.imageUrl} 
										onChange={handleInputChange} 
										className='p-2 text-white rounded-md bg-secondary'
									/> */}
								</div>
							</div>

							<div className='flex items-center justify-between gap-12 pt-6 lg:pt-0'>
								<Button 
									onClick={handleBackToWelcomeClick}
									className='px-8 font-bold uppercase'>
									Voltar
								</Button>
								<Button 
									type="submit"
									className='px-8 font-bold uppercase'>
									Criar
								</Button>
							</div>
						</form>

					</CardContent>
				</Card>
			)}

			{showCompletionMessage && (
				<>
					<h1>Concluído, Obrigado!</h1>
					<p>Sua barbearia foi criada com sucesso.</p>

					<Link href='/' passHref>
						<Button>
							Concluir
						</Button>
					</Link>
				</>
			)}
			
		</div>
	);
};

export default CreateBarbershopScreen;