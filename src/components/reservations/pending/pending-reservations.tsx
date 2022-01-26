import { Reservations, Room } from "../../../models";

import { ReservationsGrid } from "../../reservations-grid/reservations-grid";
import styles from "./pending-reservations.module.scss";

interface Props {
  reservations: Reservations[] | undefined;
  pageCount: number | undefined;
}
export const PendingReservationsComponent = ({ reservations, pageCount }: Props) => {
  return (
    <div className={styles.container}>
      {" "}
      <ReservationsGrid reservations={reservations} pageCount={pageCount} />
    </div>
  );
};
