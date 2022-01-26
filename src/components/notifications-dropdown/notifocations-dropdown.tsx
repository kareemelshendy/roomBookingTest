import dayjs from "dayjs";
import Link from "next/link";
import { useNotifications } from "../../hooks/use-notification.hook";
import { Notification } from "../../models";

export const NotificationDropDown = () => {
  const { notificationsPage, isLoading, isError } = useNotifications();

  return (
    <>
      {notificationsPage?.data.map((notification: Notification) => {
        return (
          <Link href="/notifications" key={notification._id}>
            <a className="notification dropdown-item">
              <p className="text" dir="rtl">
                {notification.text}
              </p>
              <p className="time">
                {dayjs(notification.createdAt).hour()} : {dayjs(notification.createdAt).minute()}
              </p>
            </a>
          </Link>
        );
      })}
    </>
  );
};
