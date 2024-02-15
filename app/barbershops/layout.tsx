import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import '../globals.css';

import { Footer } from '../_components/footer';
import AuthProvider from '../_providers/auth';
import { BarbershopHeader } from './[id]/_components/barbershop-header';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	icons: {
		shortcut: { url: '/favicon.svg' },
	},
	title: {
		template: '%s | FSW Barber',
		default: 'FSW Barber',
	},
	description: 'Catálogos de barbearias em sua mão',
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${nunito.className} dark`}>
				<AuthProvider>
					<BarbershopHeader />
					<div className='flex-1'>
						{children}
					</div>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}