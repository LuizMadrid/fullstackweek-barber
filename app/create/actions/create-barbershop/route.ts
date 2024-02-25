'use server';

import prisma from '@/app/_lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new NextResponse(
			JSON.stringify({
				success: false,
				message: 'User not authenticated',
			})
		);
	}

	const userId = (session.user as any).id;

	const req = await request.json();
	const { name, address, about, imageUrl } = req;

	try {
		const barbershop = await prisma.barbershop.create({
			data: {
				userId: userId,
				name,
				address,
				about,
				imageUrl,
			},
		});

		revalidatePath('/');
		revalidatePath('/create/barbershop');
		revalidatePath('/barbershop/' + barbershop.id);

		NextResponse.json({ message: 'Barbershop created' });

		return new NextResponse(
			JSON.stringify({
				success: true,
			})
		);
	} catch (error) {
		console.error('Error creating barbershop', error);
		return new NextResponse(
			JSON.stringify({
				success: false,
			})
		);
	}
}