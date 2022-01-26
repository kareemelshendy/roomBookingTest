import { useRouter } from "next/router";
import { CompletedRequestComponent } from "../../../components/incoming-requests/completed/completed-request";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useRequests } from "../../../hooks/use-requests.hook";
import { ReservationsPage } from "../../../models";

export const CompletedRequestHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { requestsPage, isLoading, isError } = useRequests(pageNumber, RoomStatus.expired);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <CompletedRequestComponent requests={requestsPage?.data} pageCount={requestsPage?.pageCount} />;
};
