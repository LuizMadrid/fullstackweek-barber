'use client';

import React, { useState } from 'react';

import { Button } from '@/app/_components/ui/button';

interface BarbershopData {
	name: string;
	address: string;
	about: string;
	imageUrl?: string;
}

const CreateBarbershopScreen = () => {

	const [barbershop, setBarbershop] = useState<BarbershopData>({
		name: '',
		address: '',
		about: '',
		imageUrl: ''
	});

	const handleInputChange = (event:any) => {
		setBarbershop({
			...barbershop,
			[event.target.id]: event.target.value
		});
	};
	
	async function create(data: BarbershopData) {
		try {
			await fetch('actions/create-barbershop', {
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
	};

	return (
		<div className='flex flex-col gap-4 justify-center items-center h-full'>
			<h1>Criar Barbearia</h1>
			<form 
				onSubmit={ 
					event => {
						event.preventDefault();
						handleSubmit(barbershop);
					}
				}
				className=''>
				<div>
					<textarea 
						// type="text"
						placeholder='Nome da barbearia'
						id="name" 
						value={barbershop.name} 
						onChange={handleInputChange} 
						className='bg-secondary text-white'
					/>
				</div>

				<div>
					<textarea 
						// type="text"
						placeholder='Endereço da barbearia' 
						id="address" 
						value={barbershop.address} 
						onChange={handleInputChange} 
						className='bg-secondary text-white'
					/>
				</div>
				
				<div>
					<textarea 
						// type='text'
						placeholder='Sobre a barbearia'
						id="about" 
						value={barbershop.about} 
						onChange={handleInputChange}
						className='bg-secondary text-white'
					/>
				</div>

				<div>
					<textarea 
						// type='text' 
						placeholder='Url da imagem'
						id="imageUrl" 
						value={barbershop.imageUrl} 
						onChange={handleInputChange} 
						className='bg-secondary text-white'
					/>
				</div>
				<Button type="submit">Criar</Button>
			</form>
		</div>
	);
};

export default CreateBarbershopScreen;