import { Reservations } from "../../../models";
import { RequestCard } from "../../request-card/request-card";
import { RequestGrid } from "../../requests-grid/request-grid";

import styles from "./accepted-request.module.scss";

interface Props {
  requests: Reservations[] | undefined;
  pageCount: number | undefined;
}
export const AcceptedRequestComponent = ({ requests, pageCount }: Props) => {
  return (
    <div className={styles.container}>
      <RequestGrid requests={requests} pageCount={pageCount} />
    </div>
  );
};
