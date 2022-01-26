import { Badge } from "react-bootstrap";
import styles from "./badge.module.scss";
interface Props {
  title: string;
  icon?: string;
  bg: string;
}

export const BadgeComponent = ({ title, icon, bg }: Props) => {
  return (
    <div className={styles.services_badge}>
      {/* <Badge bg={bg}>
        <i className={icon}></i>
        {title}
      </Badge> */}

      <span className={`badge ${bg}`}>
        {title}
        {icon && <span className={`${styles.icon} icon-${icon}`}></span>}
      </span>
    </div>
  );
};
