"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

// import { Barbershop } from '@prisma/client';
import { Prisma } from "@prisma/client";

import { CheckCircle2, Smartphone } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import CopyButton from "@/app/_components/copy-button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { BarbershopServiceInfoSkeleton } from "@/app/_components/skeletons/skeleton";

interface ServiceInfoProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      user: true;
    };
  }>;
}

export const ServiceInfo = ({ barbershop }: ServiceInfoProps) => {
  const { status } = useSession();

  const [phone1Copied, setPhone1Copied] = useState(false);
  const [phone2Copied, setPhone2Copied] = useState(false);

  const handleCopyPhone1 = () => {
    setPhone1Copied(true);
    setTimeout(() => {
      setPhone1Copied(false);
    }, 1000 * 2);
  };

  const handleCopyPhone2 = () => {
    setPhone2Copied(true);
    setTimeout(() => {
      setPhone2Copied(false);
    }, 1000 * 2);
  };

  if (status === "loading") {
    return (
      <div>
        <BarbershopServiceInfoSkeleton />
      </div>
    );
  }

  return (
    <Card className="w-full h-full border-transparent rounded-xl">
      <CardContent className="flex flex-col gap-4 p-3">
        <div className="flex flex-col gap-6">
          <div className="relative w-full h-48 overflow-hidden cursor-default group rounded-b-2xl">
            <Image
              fill
              sizes="100%"
              src={"/fswbackground-map.png"}
              alt="Mapa do local da reserva"
              className="object-cover transition-all group-hover:scale-125 group-hover:transition-all"
            />

            <div className="absolute flex items-end w-full h-full px-5 bg-gradient-to-b from-card to-transparent">
              <Card className="w-full mx-auto mb-4">
                <CardContent className="flex items-center gap-4 p-2 justify-stretch">
                  <Avatar className="size-8 md:size-12">
                    <AvatarImage
                      src={
                        barbershop?.imageUrl ??
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                    />
                  </Avatar>

                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-white md:text-lg">
                      {barbershop?.name}
                    </h3>

                    <p className="text-xs text-gray-400 md:text-sm">
                      {barbershop?.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold tracking-tight uppercase">
                Sobre Nós
              </h2>

              <p className="leading-5 tracking-tight text-justify text-gray-400">
                {barbershop?.about}
              </p>
            </div>

            {barbershop?.user ? (
              <div className="pt-5 border-t border-secondary">
                <div className="flex items-center justify-start gap-2">
                  <h2 className="font-bold tracking-tight">Proprietário:</h2>

                  <h3 className="tracking-tight text-gray-400">
                    {barbershop?.user?.name?.split(" ")[0]}
                    &nbsp;
                    {barbershop?.user?.name?.split(" ")[1]}
                  </h3>
                </div>
              </div>
            ) : null}

            <div className="py-5 space-y-4 border-y border-secondary">
              <div className="flex items-center justify-between">
                <h3 className="flex gap-2">
                  <Smartphone size={24} />
                  {barbershop?.phone1}
                </h3>

                <Button
                  onClick={handleCopyPhone1}
                  variant={phone1Copied ? "success" : "secondary"}
                  className="w-24"
                >
                  <CopyButton textToCopy={barbershop?.phone1}>
                    {phone1Copied ? (
                      <p className="flex gap-1">
                        <CheckCircle2 size={19} />
                        Copiado
                      </p>
                    ) : (
                      "Copiar"
                    )}
                  </CopyButton>
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="flex gap-2">
                  <Smartphone size={24} />
                  {barbershop?.phone2}
                </h3>

                <Button
                  onClick={handleCopyPhone2}
                  variant={phone2Copied ? "success" : "secondary"}
                  className="w-24"
                >
                  <CopyButton textToCopy={barbershop?.phone2}>
                    {phone2Copied ? (
                      <p className="flex gap-1">
                        <CheckCircle2 size={19} />
                        Copiado
                      </p>
                    ) : (
                      "Copiar"
                    )}
                  </CopyButton>
                </Button>
              </div>
            </div>

            <div className="pb-5 space-y-2 border-b border-secondary">
              <div className="flex justify-between">
                <p className="text-gray-400">Domingo</p>
                <span>Fechado</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Segunda-Feira</p>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Terça-Feira</p>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Quarta-Feira</p>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Quinta-Feira</p>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Sexta-Feira</p>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-400">Sábado</p>
                <span>Fechado</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <h2>Em parceria com</h2>
              <Image
                src="/FSW Barber.png"
                alt="FSW Barber"
                width={140}
                height={24}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
