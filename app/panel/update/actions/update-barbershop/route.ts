'use server';

import prisma from '@/app/_lib/prisma';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/_lib/auth';

export async function PUT(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new NextResponse(
			JSON.stringify({
				success: false,
				message: 'User not authenticated',
			})
		);
	}

	const req = await request.json();
	const { barbershopId, name, address, about, imageUrl, phone1, phone2 } = req;

	try {
		await prisma.barbershop.update({
			where: {
				id: barbershopId,
			},
			data: {
				name,
				address,
				about,
				imageUrl,
				phone1,
				phone2,
			},
		});

		NextResponse.json({ message: 'Barbershop has been updated' });
		
		revalidatePath('/');
		revalidatePath('/panel');

		return new NextResponse(
			JSON.stringify({
				success: true,
			})
		);
	} catch (error) {
		console.error('Error on update barbershop', error);
		return new NextResponse(
			JSON.stringify({
				success: false,
			})
		);
	}
}