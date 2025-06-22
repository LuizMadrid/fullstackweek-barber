import type { Metadata } from 'next';

import { SearchHeader } from '../_components/search-header';

export const metadata: Metadata = {
	icons: {
		shortcut: { url: '/favicon.svg' },
	},
	title: {
		template: 'FSW Barber',
		default: 'FSW Barber',
	},
	description: 'Catálogos de barbearias em sua mão',
};

export default function BookingsLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<>
			<SearchHeader />
			<div className="h-full">{children}</div>
		</>
	);
}
