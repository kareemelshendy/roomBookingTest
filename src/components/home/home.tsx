import styles from "./home.module.scss";
import { FilterHOC } from "../../hoc/filter-hoc/filter-hoc";
import { RoomsGrid } from "../rooms-grid/rooms-grid";
import { Room } from "../../models";
import { Pagination } from "../pagination/pagination";

interface Props {
  rooms: Room[] | undefined;
  isLoading: boolean;
  pageCount: number | undefined;
}
export const HomeComponent = ({ rooms, isLoading, pageCount }: Props) => {
  return (
    <>
      <div className={` ${styles.container}`}>
        <div className={styles.header}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2 className="heading heading-1 heading-bold ">
                هل تواجه صعوبة في إختيار وجهتك القادمة؟ <span>لدينا الحل!</span>{" "}
              </h2>
            </div>
          </div>
        </div>
        <FilterHOC />
        <div className="container mt-4 " dir="rtl">
          <div className={`row ${styles.grid}`}>
            <div className="mb-1">
              <h2 className="heading heading-3 heading-bold" dir="rtl">
                غرفة قريبة منك !
              </h2>
            </div>

            <RoomsGrid rooms={rooms} />

            <div className={styles.pagination}>
              <Pagination pageCount={pageCount} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
