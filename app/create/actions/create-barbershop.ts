'use server';

import prisma from '@/app/_lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name, address, about, imageUrl } = req.body;

	try {
		const barbershop = await prisma.barbershop.create({
			data: {
				name,
				address,
				about,
				imageUrl,
			},
		});

		revalidatePath('/');
		revalidatePath('/create/barbershop');
		revalidatePath('/barbershop/' + barbershop.id);

		res.status(201).json(barbershop);
		res.status(201).json({ message: 'Barbershop created' });
	} catch (error) {
		console.error('Error creating barbershop', error);
		// res.status(500).json({ error: 'Error creating barbershop' });
	}
}