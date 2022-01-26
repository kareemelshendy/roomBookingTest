import { RequestDetailsComponent } from "../../components/request-details/request-details";
import { Reservations } from "../../models";

export const RequestDetailsHOC = ({ reservation }: { reservation: Reservations | undefined }) => {
  return <RequestDetailsComponent reservation={reservation} />;
};
