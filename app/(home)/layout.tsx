import type { Metadata } from 'next';

import { Header } from '../_components/header';

export const metadata: Metadata = {
	icons: {
		shortcut: { url: '/favicon.svg' },
	},
	title: 'Home | FSW Barber',
	description: 'Catálogos de barbearias em sua mão',
};

export default function HomeLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<div className='h-full mb-[4.5rem]'>
				{children}
			</div>
		</>
	);
}
