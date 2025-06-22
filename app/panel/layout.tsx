import { Metadata } from "next";
import { AsidePainel } from "./_components/aside-painel";

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

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full 2sm:flex-row">
      <div className="hidden 2sm:flex">
        <AsidePainel />
      </div>

      <div className="w-full overflow-x-hidden">{children}</div>
    </div>
  );
}
