import { useRouter } from "next/router";
import { PendingReservationsComponent } from "../../../components/reservations/pending/pending-reservations";
import { useReservations } from "../../../hooks/use-reservations.hook";
import { Reservations, ReservationsPage, Room } from "../../../models";

export const PendingReservationsHOC = ({ pendingFallback }: { pendingFallback: ReservationsPage }) => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { reservationsPage, isLoading, isError } = useReservations(pageNumber, "PENDING", pendingFallback);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <PendingReservationsComponent reservations={reservationsPage?.data} pageCount={reservationsPage?.pageCount} />;
};
