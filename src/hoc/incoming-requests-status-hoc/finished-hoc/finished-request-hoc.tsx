import { useRouter } from "next/router";
import { FinishedRequestComponent } from "../../../components/incoming-requests/finished/finished-request";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useRequests } from "../../../hooks/use-requests.hook";
import { ReservationsPage } from "../../../models";

export const FinishedRequestHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { requestsPage, isLoading, isError } = useRequests(pageNumber, RoomStatus.rejected);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;
  return <FinishedRequestComponent requests={requestsPage?.data} pageCount={requestsPage?.pageCount} />;
};
