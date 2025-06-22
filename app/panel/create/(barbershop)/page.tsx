import { Metadata } from 'next';

import { DropdownMenu } from '@/app/_components/dropdown-menu';
import { CreateBarbershop } from './_components/create-barbershop';
import { HamburgerMenuPainel } from '../../_components/hamburger-menu-painel';

export const metadata: Metadata = {
	title: 'Criar Barbearia | FSW Barber',
};

const CreateBarbershopScreen = () => {
	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between py-5 mx-5 border-b border-secondary">
				<div className="space-y-2">
					<h1 className="text-2xl font-bold">Crie sua Barbearia</h1>
					<p className="text-sm text-gray-400">
            Personalize sua barbearia e deixe com sua cara.
					</p>
				</div>

				<div className="2sm:hidden">
					<HamburgerMenuPainel />
				</div>

				<div className="hidden 2sm:flex">
					<DropdownMenu />
				</div>
			</div>

			<div className="p-5">
				<CreateBarbershop />
			</div>
		</div>
	);
};

export default CreateBarbershopScreen;
