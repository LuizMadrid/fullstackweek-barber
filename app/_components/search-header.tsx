'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Search } from '@/app/(home)/_components/search';
import { SignInDialog } from '@/app/_components/signin-dialog';
import { HamburgerMenu } from '@/app/_components/hamburger-menu';

import { LogIn } from 'lucide-react';
import { DropdownMenu } from './dropdown-menu';
import { Button } from '@/app/_components/ui/button';
import { HeaderSearchSkeleton } from './skeletons/skeleton';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';

export const SearchHeader = () => {
	const { status } = useSession();

	const [isUserAuth, setUserAuth] = useState(false);

	if (status === 'loading') {
		return (
			<div>
				<HeaderSearchSkeleton />
			</div>
		);
	}

	return (
		<div className="w-full p-5 lg:px-32 bg-background border-b border-secondary static">
			<div className="flex items-center justify-between sm:hidden">
				<Link href={'/'} prefetch={true}>
					<Image
						src="/FSW Barber.png"
						alt="FSW Barber"
						width={120}
						height={18}
					/>
				</Link>

				<HamburgerMenu />
			</div>

			<div className="hidden sm:flex sm:justify-between sm:items-center">
				<Link href={'/'} prefetch={true}>
					<Image
						src="/FSW Barber.png"
						alt="FSW Barber"
						width={120}
						height={18}
					/>
				</Link>

				<div className="hidden sm:block lg:hidden">
					<HamburgerMenu />
				</div>

				<div className="hidden 2lg:block 2lg:w-1/2">
					<Search />
				</div>

				<div className="hidden lg:flex lg:gap-2">
					{status === 'unauthenticated' && (
						<Dialog open={isUserAuth} onOpenChange={setUserAuth}>
							<DialogTrigger asChild>
								<Button className="flex items-center justify-start w-full gap-2 rounded-lg">
									<LogIn size={16} />
                  Entrar
								</Button>
							</DialogTrigger>

							<SignInDialog />
						</Dialog>
					)}

					{status === 'authenticated' && <DropdownMenu />}
				</div>
			</div>
		</div>
	);
};
