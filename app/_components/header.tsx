import Image from 'next/image';
import { HamburgerMenu } from './hamburger-menu';

export const Header = () => {
	return (
		<header className="justify-between flex items-center p-5 rounded-none bg-background border-b border-secondary">
			<Image 
				src="/FSW Barber.png" 
				alt="FSW Barber" 
				width={120} 
				height={18} 
			/>

			<HamburgerMenu />

		</header>
	);
};
