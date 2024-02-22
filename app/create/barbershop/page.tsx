'use client';

import React, { useState } from 'react';

const CreateBarbershopScreen: React.FC = () => {
	// const [name, setName] = useState('');
	// const [address, setAddress] = useState('');
	const [barbershop, setBarbershop] = useState({
		name: '',
		address: '',
		about: ''
	});

	// const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setName(event.target.value);
	// };

	// const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setAddress(event.target.value);
	// };

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBarbershop({
			...barbershop,
			[event.target.name]: event.target.value
		});
	};
	
	const handleSubmit = () => {
		console.log(barbershop);
	};

	return (
		<div>
			<h1>Criar Barbearia</h1>
			<form>
				<div>
					<label>Nome:</label>
					<input type="text" id="name" value={barbershop.name} onChange={handleInputChange} />
				</div>

				<div>
					<label>Endereço:</label>
					<input type="text" id="address" value={barbershop.address} onChange={handleInputChange} />
				</div>
				
				<div>
					<label>Sobre:</label>
					<input type='text' id="about" value={barbershop.about} onChange={handleInputChange} />
				</div>
				<button type="submit" onClick={handleSubmit}>Criar</button>
			</form>
		</div>
	);
};

export default CreateBarbershopScreen;