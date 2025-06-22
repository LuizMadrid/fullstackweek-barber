'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Search } from '@/app/(home)/_components/search';
import { BackToPage } from '@/app/_components/go-back';
import { SignInDialog } from '@/app/_components/signin-dialog';
import { HamburgerMenu } from '@/app/_components/hamburger-menu';

import { LogIn } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { DropdownMenu } from '@/app/_components/dropdown-menu';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';
import { BarbershopHeaderSkeleton } from '@/app/_components/skeletons/skeleton';

export const BarbershopHeader = () => {
	const [isUserAuth, setUserAuth] = useState(false);

	const { status } = useSession();

	if (status === 'loading') {
		return (
			<div>
				<BarbershopHeaderSkeleton />
			</div>
		);
	}

	return (
		<div className="absolute top-0 z-50 w-full p-5 lg:px-32 sm:bg-background sm:border-b sm:border-secondary sm:static">
			<div className="flex justify-between sm:hidden">
				<BackToPage />

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
