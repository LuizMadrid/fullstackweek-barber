import prisma from '../_lib/prisma';

import { BarbershopItem } from '../(home)/_components/barbershop-item';
import { SearchHeader } from '../_components/search-header';

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
} 

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {

	const barbershops = await prisma.barbershop.findMany({
		where: {
			name: {
				contains: searchParams.search,
				mode: 'insensitive',
			}
		},
	});
  
	return (
		<>
			<SearchHeader />	
				
			<div className='p-5 lg:px-32'>
				<h1 className='text-sm sm:text-base lg:text-lg font-bold tracking-tight'>Resultados para &quot;{searchParams.search}&quot;</h1>

				<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
					{barbershops.map((barbershop) => (
						<div key={barbershop.id} className='w-60 mx-auto xs:mx-0 xs:w-full'>
							<BarbershopItem barbershop={barbershop} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default BarbershopsPage;