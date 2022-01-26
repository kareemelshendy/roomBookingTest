import { useRouter } from "next/router";
import { CancelledRequestComponent } from "../../../components/incoming-requests/cancelled/cancelled-request";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useRequests } from "../../../hooks/use-requests.hook";
import { ReservationsPage } from "../../../models";

export const CancelledRequestHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { requestsPage, isLoading, isError } = useRequests(pageNumber, RoomStatus.cancelled);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;
  return <CancelledRequestComponent requests={requestsPage?.data} pageCount={requestsPage?.pageCount} />;
};
