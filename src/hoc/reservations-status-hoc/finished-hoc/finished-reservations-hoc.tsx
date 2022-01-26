import { useRouter } from "next/router";
import { FinishedReservationsComponent } from "../../../components/reservations/finished/finished-reservations";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useReservations } from "../../../hooks/use-reservations.hook";
import { ReservationsPage, Room } from "../../../models";

export const FinishedReservationsHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { reservationsPage, isLoading, isError } = useReservations(pageNumber, RoomStatus.rejected);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <FinishedReservationsComponent reservations={reservationsPage?.data} pageCount={reservationsPage?.pageCount} />;
};
