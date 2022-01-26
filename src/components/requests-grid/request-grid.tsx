import { Reservations } from "../../models";
import { NoData } from "../no-data/no-data";
import { Pagination } from "../pagination/pagination";
import { RequestCard } from "../request-card/request-card";
import styles from "./request-grid.module.scss";
interface Props {
  requests: Reservations[] | undefined;
  pageCount: number | undefined;
}
export const RequestGrid = ({ requests, pageCount }: Props) => {
  return (
    <>
      <div dir="rtl" className={styles.grid}>
        {requests?.length === 0 && <NoData title="لا يوجد طلبات" />}
        {requests?.map((request: Reservations) => {
          return <RequestCard key={request?._id} request={request} />;
        })}

        {requests && requests?.length > 0 && <Pagination pageCount={pageCount} />}
      </div>
    </>
  );
};
