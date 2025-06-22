import prisma from "../_lib/prisma";

import { BarbershopItem } from "../(home)/_components/barbershop-item";
import { redirect } from "next/navigation";
import { Search } from "../(home)/_components/search";

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

export async function generateMetadata({ searchParams }: BarbershopPageProps) {
  return {
    title: `Resultados para "${searchParams.search}" | FSW Barber`,
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await prisma.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className="p-5 lg:px-32 mt-12 md:mt-0">
      <div className="2lg:hidden mt-2 mb-6">
        <Search
          defaultSearch={{
            search: searchParams.search,
          }}
        />
      </div>

      <h1 className="text-sm uppercase text-gray-400 sm:text-base lg:normal-case lg:text-lg lg:text-white lg:font-bold tracking-tight">
        Resultados para &quot;{searchParams.search}&quot;
      </h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {barbershops.map((barbershop) => (
          <div key={barbershop.id} className="w-60 mx-auto xs:mx-0 xs:w-full">
            <BarbershopItem barbershop={barbershop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarbershopsPage;
