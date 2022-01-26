import Link from "next/link";
import { useRouter } from "next/router";
import { Owner, Room } from "../../models";
import { Button } from "../button/button";
import { ProfileImage } from "../profileImage/profile-image";

import styles from "./owner-card.module.scss";
export const OwnerCard = ({ owner }: { owner: Owner | undefined }) => {
  const router = useRouter();
  return (
    <>
      <div className={`${styles.request_owner} shadow_sm border-r`}>
        <h3 className="heading-4 heading-bold">{router.pathname == `/incoming-requests/[requestid]/details` ? "مقدم الطلب" : "مالك الغرفة"}</h3>
        <ProfileImage width="130px" height="130.76px" src={owner?.profileImage?.original ? owner?.profileImage?.original : "/"} />
        <Link href={`/profile/${owner?._id}`}>
          <a>
            <p className="heaidng-4 heading-semiBold heading-darkGrey mt-1 mb-1">{owner?.name}</p>
          </a>
        </Link>
        <div className={styles.button}>
          <Button btnPrimary="btn-primary" width="w-100">
            محادثة
            <i className="fas fa-comment-dots"></i>
          </Button>
        </div>
      </div>
    </>
  );
};
