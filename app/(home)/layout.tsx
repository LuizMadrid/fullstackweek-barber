import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import '../globals.css';

import { Header } from '../_components/header';
import { Footer } from '../_components/footer';
import AuthProvider from '../_providers/auth';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	icons: {
		shortcut: { url: '/favicon.svg' },
	},
	title: 'Home | FSW Barber',
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
					<Header />
					<div className='flex-1'>
						{children}
					</div>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
