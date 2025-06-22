import { BookingItem } from "../../_components/booking-item";

type BookingsSheetProps = {
  bookings: any[];
  title: string;
};

export const BookingsSheet = ({ bookings, title }: BookingsSheetProps) => {
  return (
    <>
      <h2 className="text-sm text-gray-400 uppercase sm:text-base mt-7 mb-4">
        {title}
      </h2>

      <div className="min-w-full space-y-4">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};
