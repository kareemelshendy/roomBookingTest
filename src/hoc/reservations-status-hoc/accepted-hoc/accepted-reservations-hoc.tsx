import { useRouter } from "next/router";
import { AcceptedReservationsComponent } from "../../../components/reservations/accepted/accepted-reservations";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useReservations } from "../../../hooks/use-reservations.hook";
import { ReservationsPage, Room } from "../../../models";

export const AcceptedReservationsHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { reservationsPage, isLoading, isError } = useReservations(pageNumber, RoomStatus.accepted);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <AcceptedReservationsComponent reservations={reservationsPage?.data} pageCount={reservationsPage?.pageCount} />;
};
