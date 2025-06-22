import React from 'react';
import './globals.css';

import { Nunito } from 'next/font/google';

import AuthProvider from './_providers/auth';
import { Footer } from './_components/footer';

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${nunito.className} dark`}>
				<AuthProvider>
					<div className="flex-1">{children}</div>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
