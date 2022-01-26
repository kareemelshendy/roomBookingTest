import { useRouter } from "next/router";
import { CompletedReservationsComponent } from "../../../components/reservations/completed/completed-reservations";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useReservations } from "../../../hooks/use-reservations.hook";
import { ReservationsPage, Room } from "../../../models";

export const CompletedReservationsHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { reservationsPage, isLoading, isError } = useReservations(pageNumber, RoomStatus.expired);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <CompletedReservationsComponent reservations={reservationsPage?.data} pageCount={reservationsPage?.pageCount} />;
};
