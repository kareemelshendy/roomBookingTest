import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Reservations } from "../../models";
import axios from "../../utils/axios";
import { BadgeComponent } from "../badge/badge";
import { Button } from "../button/button";
import styles from "./request-details.module.scss";
import useSWR, { useSWRConfig } from "swr";

export const RequestDetailsComponent = ({ reservation }: { reservation: Reservations | undefined }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  let statusName = "";
  let statusColor = "";
  switch (reservation?.status) {
    case "PENDING":
      statusName = "قيد الإنتظار";
      statusColor = "yellow";
      break;
    case "ACCEPTED":
      statusName = "موافق";
      statusColor = "green";
      break;
    case "EXPIRED":
      statusName = "مكتمل";
      statusColor = "blue";
      break;
    case "CANCELLED_BY_CLIENT":
      statusName = "ملغي";
      statusColor = "red";
      break;
    case "REJECTED":
      statusName = "مرفوض";
      statusColor = "grey";
      break;
  }

  const acceptRequest = async () => {
    try {
      const response = await axios.patch(`bookings/${reservation?._id}`, {
        status: "accepted",
      });
      mutate(`/bookings/${reservation?._id}`);

      console.log(response.data);
    } catch (error: any) {
      console.log(error?.response.data.message);
    }
  };

  const rejectRequest = async () => {
    try {
      const response = await axios.patch(`/bookings/${reservation?._id}`, {
        status: "REJECTED",
      });
      mutate(`/bookings/${reservation?._id}`);
      console.log(response.data);
    } catch (error: any) {
      console.log(error?.response.data.message);
    }
  };
  return (
    <>
      <div className={` shadow_sm border-r ${styles.request_container}`} dir="rtl">
        <h2 className="heading-dark heading-3 heading-bold mb-1">{reservation?.room?.name}</h2>
        <div className={styles.request_info}>
          <div className={styles.status}>
            <div>
              <h3 className={`heading-bold heading-5 heading-darkGrey  ${styles.infoTitle}`}>الحاله</h3>

              <BadgeComponent title={statusName} bg={`badge-${statusColor}`} />
            </div>
          </div>
          <div className={styles.numberOfUsers}>
            <div>
              <h3 className={`heading-bold heading-5 heading-darkGrey  ${styles.infoTitle}`}>عدد الافراد</h3>
              <p>
                <i className="fas fa-user"></i> {reservation?.room?.capacity}
              </p>
            </div>
          </div>
          <div className={styles.date}>
            <div>
              <h3 className={`heading-bold heading-5 heading-darkGrey  ${styles.infoTitle}`}>من تاريخ</h3>
              <p dir="ltr">{dayjs(reservation?.startDate).format("DD MMMM")}</p>
            </div>
          </div>
          <div className={styles.date}>
            <div>
              <h3 className={`heading-bold heading-5 heading-darkGrey  ${styles.infoTitle}`}>إلي تاريخ</h3>
              <p dir="ltr">{dayjs(reservation?.endDate).format("DD MMMM")}</p>
            </div>
          </div>
          <div className={styles.price}>
            <div>
              <h3 className={`heading-bold heading-5 heading-darkGrey  ${styles.infoTitle}`}>السعر الإجمالي </h3>
              <p dir="ltr">{reservation?.room?.nightPrice} L.E</p>
            </div>
          </div>
        </div>
        <div className={styles.notes}>
          <h3 className="heading-bold heading-darkGrey ">ملاحظات</h3>
          <p>{reservation?.notes}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        {reservation?.status === "PENDING" && router.pathname === `/incoming-requests/[requestid]/details` && (
          <>
            <div className={styles.button}>
              <Button
                btnPrimary="btn-primary"
                width="w-100"
                onClick={() => {
                  acceptRequest();
                }}
              >
                موافق
              </Button>
            </div>
            <div className={styles.button}>
              <Button
                btnBorderPrimary="btn-border-primary"
                width="w-100"
                onClick={() => {
                  rejectRequest();
                }}
              >
                إلغاء
              </Button>
            </div>
          </>
        )}
        {reservation?.status === "ACCEPTED" && (
          <div className={styles.button}>
            <Button
              btnBorderPrimary="btn-border-primary"
              width="w-100"
              onClick={() => {
                rejectRequest();
              }}
            >
              إلغاء
            </Button>
          </div>
        )}
      </div>

      {/* <div className="col-md-3">
        <div className={`${styles.request_owner} shadow_sm border-r`}>
          <h3 className="heading-4 heading-bold">مقدم الطلب</h3>
          <ProfileImage width="130px" height="130.76px" />
          <p className="heaidng-4 heading-semiBold heading-darkGrey mt-1 mb-1">حسين صابر الرفاعي </p>
          <div className={styles.button}>
            <Button btnPrimary="btn-primary" width="w-100">
              محادثة
              <i className="fas fa-comment-dots"></i>
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
};
