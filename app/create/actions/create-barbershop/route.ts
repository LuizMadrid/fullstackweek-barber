'use server';

import prisma from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {

	const req = await request.json();
	const { name, address, about, imageUrl } = req;

	try {
		const barbershop = await prisma.barbershop.create({
			data: {
				name,
				address,
				about,
				imageUrl,
			},
		});

		return new NextResponse(
			JSON.stringify({
				success: true,
			})
		);

		revalidatePath('/');
		revalidatePath('/create/barbershop');
		revalidatePath('/barbershop/' + barbershop.id);

		NextResponse.json(barbershop);
		NextResponse.json({ message: 'Barbershop created' });
	} catch (error) {
		console.error('Error creating barbershop', error);
		return new NextResponse(
			JSON.stringify({
				success: false,
			})
		);
	}
}