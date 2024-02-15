import { Loader2 } from 'lucide-react';

export default function Loading() {
	return (
		<div className='w-full h-full bg-background'>
			<div className='px-5 lg:py-16 lg:px-32 flex justify-center items-center text-center h-full'>
				<Loader2 className="w-6 h-6 mr-2 animate-spin" />
				<h1 className='text-lg md:text-xl lg:text-2xl'>Carregando Conteúdo...</h1>
			</div>
		</div>
	);
}