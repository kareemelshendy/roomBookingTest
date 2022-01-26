import Image from "next/image";
import { Reservations } from "../../models";
import { Card } from "../card/card";
import { NoData } from "../no-data/no-data";
import { Pagination } from "../pagination/pagination";
import styles from "./reservations-grid.module.scss";

interface Props {
  reservations: Reservations[] | undefined;
  pageCount: number | undefined;
}

export const ReservationsGrid = ({ reservations, pageCount }: Props) => {
  return (
    <div className={`border-r ${styles.col}`} dir="rtl">
      {reservations?.length === 0 && <NoData title="لا يوجد حجوزات" />}

      <div className={styles.room_container}>
        {reservations?.map((reservation: Reservations) => {
          return <Card key={reservation._id} room={reservation?.room} id={reservation?._id} />;
        })}
      </div>

      {reservations && reservations.length > 0 && <Pagination pageCount={pageCount} />}
    </div>
  );
};
