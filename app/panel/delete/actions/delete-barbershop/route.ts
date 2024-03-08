'use server';

import prisma from '@/app/_lib/prisma';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/_lib/auth';

export async function DELETE(request: Request) {
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
	const { barbershopId } = req;

	try {
		await prisma.barbershop.delete({
			where: {
				id: barbershopId,
			},
		});

		NextResponse.json({ message: 'Barbershop has been deleted' });
		
		revalidatePath('/');
		revalidatePath('/panel');

		return new NextResponse(
			JSON.stringify({
				success: true,
			})
		);
	} catch (error) {
		console.error('Error on delete barbershop', error);
		return new NextResponse(
			JSON.stringify({
				success: false,
			})
		);
	}
}