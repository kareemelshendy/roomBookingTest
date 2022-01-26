import { Alert } from "react-bootstrap";
import styles from "./alert.module.scss";
export const AlertCompnent = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Alert variant={"danger"} className={styles.alert}>
      {errorMessage}
    </Alert>
  );
};
