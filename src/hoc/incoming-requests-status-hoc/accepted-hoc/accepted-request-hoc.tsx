import { useRouter } from "next/router";
import { AcceptedRequestComponent } from "../../../components/incoming-requests/accepted/accepted-request";
import { RoomStatus } from "../../../enums/room-status.emun";
import { useRequests } from "../../../hooks/use-requests.hook";
import { ReservationsPage } from "../../../models";

export const AcceptedRequestHOC = () => {
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;
  const { requestsPage, isLoading, isError } = useRequests(pageNumber, RoomStatus.accepted);

  if (isLoading) return <div className="text-center">... جاري التحميل</div>;

  return <AcceptedRequestComponent requests={requestsPage?.data} pageCount={requestsPage?.pageCount} />;
};
