import { useRouter } from "next/router";
import { PendingRequestComponent } from "../../../components/incoming-requests/pednding/pending-request";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useRequests } from "../../../hooks/use-requests.hook";
import { ReservationsPage } from "../../../models";

export const PendingRequestHOC = ({ pendingRequests }: { pendingRequests: ReservationsPage }) => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { requestsPage, isLoading, isError } = useRequests(pageNumber, RoomStatus.pending, pendingRequests);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <PendingRequestComponent requests={requestsPage?.data} pageCount={requestsPage?.pageCount} />;
};
