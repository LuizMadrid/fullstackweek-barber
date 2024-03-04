import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { authOptions } from '@/app/_lib/auth';
import { getServerSession } from 'next-auth';

import prisma from '@/app/_lib/prisma';

import { DropdownMenu } from '@/app/_components/dropdown-menu';
import { EditBarbershopInfo } from './_components/edit-barbershop-info';
import { HamburgerMenuPainel } from '../../_components/hamburger-menu-painel';

export async function generateMetadata({
	params,
}: BarbershopEditPageProps): Promise<Metadata> {
	const barbershop = await prisma.barbershop.findUnique({
		where: {
			id: params.id,
		},
	});

	return {
		title: `Editar ${barbershop?.name  ?? 'Barbearia'}`,
	};
}


interface BarbershopEditPageProps {
	params: {
		id?: string;
	};
}

const BarbershopEditPage = async ({ params }: BarbershopEditPageProps) => {

	const session = await getServerSession(authOptions);

	const barbershop = await prisma.barbershop.findUnique({
		where: {
			id: params.id,
			userId: (session?.user as any).id,
		},
		include: {
			services: true,
			user: true,
		}
	});

	if (barbershop?.userId !== (session?.user as any).id) {
		return redirect('/panel');
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between py-5 mx-5 border-b border-secondary'>
				<div className='space-y-2'>
					<h1 className='text-2xl font-bold'>Suas Informações</h1>
					<p className='text-sm text-gray-400'>Atualize suas informações e serviços.</p>
				</div>
				
				<div className='2sm:hidden'>
					<HamburgerMenuPainel />
				</div>
				
				<div className='hidden 2sm:flex'>
					<DropdownMenu />
				</div>
			</div>

			<div className='p-5'>
				<EditBarbershopInfo barbershop={barbershop as any} />
			</div>
		</div>
	);
};

export default BarbershopEditPage;