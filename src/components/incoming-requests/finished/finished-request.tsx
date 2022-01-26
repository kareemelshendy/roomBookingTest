import { Reservations } from "../../../models";
import { RequestCard } from "../../request-card/request-card";
import { RequestGrid } from "../../requests-grid/request-grid";
import styles from "./finished-request.module.scss";

interface Props {
  requests: Reservations[] | undefined;
  pageCount: number | undefined;
}

export const FinishedRequestComponent = ({ requests, pageCount }: Props) => {
  return (
    <div className={styles.container}>
      <RequestGrid requests={requests} pageCount={pageCount} />
    </div>
  );
};
