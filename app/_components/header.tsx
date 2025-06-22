"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useSession } from "next-auth/react";

import { Button } from "./ui/button";
import { SignInDialog } from "./signin-dialog";
import { HamburgerMenu } from "./hamburger-menu";
import { Dialog, DialogTrigger } from "./ui/dialog";

import { LogIn } from "lucide-react";
import { DropdownMenu } from "./dropdown-menu";
import { HeaderSkeleton } from "./skeletons/skeleton";

export const Header = () => {
  const { status } = useSession();

  const [isUserAuth, setUserAuth] = useState(false);

  if (status === "loading") {
    return (
      <div>
        <HeaderSkeleton />
      </div>
    );
  }

  return (
    <header className="flex items-center justify-between p-5 border-b lg:px-32 bg-background border-secondary">
      <Link href={"/"} prefetch={true}>
        <Image src="/FSW Barber.png" alt="FSW Barber" width={120} height={18} />
      </Link>

      <div className="lg:hidden">
        <HamburgerMenu />
      </div>

      <div className="hidden lg:flex lg:gap-2">
        {status === "unauthenticated" && (
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

        {status === "authenticated" && <DropdownMenu />}
      </div>
    </header>
  );
};
