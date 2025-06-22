import type { Metadata } from "next";

import { BarbershopHeader } from "./[id]/_components/barbershop-header";

export const metadata: Metadata = {
  icons: {
    shortcut: { url: "/favicon.svg" },
  },
  title: {
    template: "%s | FSW Barber",
    default: "FSW Barber",
  },
  description: "Catálogos de barbearias em sua mão",
};

export default function BarbershopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BarbershopHeader />
      <div className="h-full mb-[4.5rem]">{children}</div>
    </>
  );
}
