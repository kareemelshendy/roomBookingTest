import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Reservations } from "../../models";

import styles from "./request-card.module.scss";
export const RequestCard = ({ request }: { request: Reservations }) => {
  const { asPath, pathname } = useRouter();
  // console.log(asPath)
  console.log();
  return (
    <Link href={`${pathname}/${request._id}/details`}>
      <a>
        <div className={`shadow_sm ${styles.card}`}>
          <div className={styles.card_image}>
            <Image src={request.room.images[0].original ? request.room.images[0].original : "/"} width="152px" height="152px" objectFit="cover" alt={request?.room?.name} />
          </div>
          <div className={styles.card_content}>
            <h3 className={`heading-bold heading-5 heading-dark ${styles.title}`}>{request?.room?.name}</h3>{" "}
            <p className={styles.location}>
              <i className="fas fa-map-marker-alt"></i>
              العين السخنة كمباوند أروما الكيلو 39
            </p>
            <div className={styles.card_bottom}>
              <div className={styles.card_date}>
                <p>
                  <i className="far fa-calendar"></i>
                  من تاريخ
                  <span>{dayjs(request?.startDate).format("DD MMMM")}</span>
                  الي تاريخ
                  <span>{dayjs(request?.endDate).format("DD MMMM")} </span>
                </p>
              </div>
              <p className={styles.card_price}>{request?.room?.nightPrice} L.E</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
