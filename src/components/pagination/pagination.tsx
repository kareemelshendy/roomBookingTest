import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./pagination.module.scss";

export const Pagination = ({ pageCount }: { pageCount: number | undefined }) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);
  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        pageNumber,
      },
    });
  }, [pageNumber]);
  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.pagination_button}>
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
            disabled={pageNumber === pageCount}
          >
            next
          </button>
        </div>
        <div className={styles.pagination_button}>
          <button
            className="btn btn-primary w-100"
            disabled={pageNumber === 1}
            onClick={() => {
              setPageNumber(pageNumber - 1);
            }}
          >
            prev
          </button>
        </div>
      </div>
    </>
  );
};
