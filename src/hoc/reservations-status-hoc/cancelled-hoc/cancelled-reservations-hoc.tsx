import { useRouter } from "next/router";
import { CancelledReservationsComponent } from "../../../components/reservations/cancelled/cancelled-reservations";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useReservations } from "../../../hooks/use-reservations.hook";
import { ReservationsPage, Room } from "../../../models";

export const CancelledReservationsHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { reservationsPage, isLoading, isError } = useReservations(pageNumber, RoomStatus.cancelled);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <CancelledReservationsComponent reservations={reservationsPage?.data} pageCount={reservationsPage?.pageCount} />;
};
