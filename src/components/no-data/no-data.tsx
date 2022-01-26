import styles from "./no-data.module.scss";
import Image from "next/image";

export const NoData = ({ title }: { title: string }) => {
  return (
    <div className={styles.noData}>
      <Image src="/nodata.jpg" width={"300px"} height={"300px"} alt="no-Data" />
      <h3 className="heading heading-2 heading-semiBold ">{title}</h3>
    </div>
  );
};
