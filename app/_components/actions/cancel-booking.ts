"use server";

import prisma from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const CancelBooking = async (bookingId: string) => {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/");
  revalidatePath("/bookings");
};
