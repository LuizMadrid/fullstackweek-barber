'use server';

import prisma from '@/app/_lib/prisma';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/_lib/auth';

const services = [
	{
		name: 'Corte de Cabelo',
		description: 'Estilo personalizado com as últimas tendências.',
		price: 60.0,
		imageUrl:
      'https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png',
	},
	{
		name: 'Barba',
		description: 'Modelagem completa para destacar sua masculinidade.',
		price: 40.0,
		imageUrl:
      'https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png',
	},
	{
		name: 'Pézinho',
		description: 'Acabamento perfeito para um visual renovado.',
		price: 35.0,
		imageUrl:
      'https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png',
	},
	{
		name: 'Sobrancelha',
		description: 'Expressão acentuada com modelagem precisa.',
		price: 20.0,
		imageUrl:
      'https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png',
	},
	{
		name: 'Massagem',
		description: 'Relaxe com uma massagem revigorante.',
		price: 50.0,
		imageUrl:
      'https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png',
	},
	{
		name: 'Hidratação',
		description: 'Hidratação profunda para cabelo e barba.',
		price: 25.0,
		imageUrl: 'https://utfs.io/f/6cf53916-0096-4d31-ac5e-1b504efad89c-28jn.png',
	},
];

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new NextResponse(
			JSON.stringify({
				success: false,
				message: 'User not authenticated',
			}),
		);
	}

	const userId = (session.user as any).id;

	const req = await request.json();
	const { name, street, number, about, imageUrl, phone1, phone2 } = req;

	try {
		await prisma.barbershop.create({
			data: {
				userId: userId,
				name,
				street,
				number,
				about,
				imageUrl,
				phone1,
				phone2,
				services: {
					create: services,
				},
			},
		});

		NextResponse.json({ message: 'Barbershop created' });

		revalidatePath('/');
		revalidatePath('/panel');

		return new NextResponse(
			JSON.stringify({
				success: true,
			}),
		);
	} catch (error) {
		console.error('Error creating barbershop', error);
		return new NextResponse(
			JSON.stringify({
				success: false,
			}),
		);
	}
}
