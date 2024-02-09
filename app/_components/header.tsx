import Image from 'next/image';
import { HamburgerMenu } from './hamburger-menu';

export const Header = () => {
	return (
		<header className="flex items-center justify-between p-5 border-b rounded-none bg-background border-secondary">
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
