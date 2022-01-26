import Link from "next/link";
import { Notification } from "../../models";
import styles from "./notifications.module.scss";

export const NotificationsComponent = ({ notifications }: { notifications: Notification[] | undefined }) => {

  console.log(notifications)
  return (
    <section>
      <div className="container mt-3 mb-3 " dir="rtl">
        <div className="row">
          <div className="mb-2">
            <h2 className="heading heading-3 heading-bold">الإشعارات</h2>
          </div>
          <div className="col-md-12">
            <div className={`shadow_sm ${styles.notifications} `}>
              {notifications?.map((notification: Notification) => {
                return (
                  <Link key={notification._id} href="/incoming-requests/1/details">
                    <a className={styles.link}>
                      <div className={`${styles.notification} ${styles.new}`}>
                        <p className={styles.notification_title}>{notification?.text}</p>
                        <p className={styles.notification_time}>
                          12:43<span>am</span>
                        </p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
