import Image from "next/image";

import { Prisma } from "@prisma/client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { Badge } from "@/app/_components/ui/badge";
import { format } from "date-fns";

interface TodayBookingUserProps {
  bookings: Prisma.BookingGetPayload<{
    include: {
      user: true;
      barbershop: true;
      service: true;
    };
  }>;
}

export const TodayBookingUser = ({ bookings }: TodayBookingUserProps) => {
  return (
    <Card className="border-transparent">
      <CardContent className="flex flex-col items-center justify-center gap-3 p-5 text-center">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-center space-x-4 text-gray-400">
            <Image
              src={bookings.user.image as any}
              alt={bookings.user.name as any}
              width={32}
              height={32}
              className="rounded-full"
            />
            <p className="text-base">
              {bookings?.user?.name?.split(" ")[0]}
              &nbsp;
              {bookings?.user?.name?.split(" ")[1]}
            </p>
          </CardTitle>
        </CardHeader>

        <Separator
          orientation="horizontal"
          className="w-full h-px bg-secondary"
        />

        <div className="flex gap-2">
          <Badge>{bookings.service.name}</Badge>
          <p className="font-bold">{format(bookings.date, "HH:mm")}</p>
        </div>
        <h2 className="font-bold tracking-tighter text-center text-gray-400 uppercase">
          {bookings.barbershop.name}
        </h2>
      </CardContent>
    </Card>
  );
};
