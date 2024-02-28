import type { Metadata } from 'next';

import { Header } from '../_components/header';

export const metadata: Metadata = {
	icons: {
		shortcut: { url: '/favicon.svg' },
	},
	title: 'FSW Barber',
	description: 'Catálogos de barbearias em sua mão',
};

export default function CreateLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<div className='h-full'>
				{children}
			</div>
		</>
	);
}
