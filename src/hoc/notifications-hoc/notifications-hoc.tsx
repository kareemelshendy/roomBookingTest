import { NotificationsComponent } from "../../components/notifications/notifications";
import { useNotifications } from "../../hooks/use-notification.hook";
import { NotificationsPage } from "../../models";

export const NotificationsHOC = ({ notificationsFallback }: { notificationsFallback: NotificationsPage }) => {
  const { notificationsPage, isLoading, isError } = useNotifications(notificationsFallback);

  return <NotificationsComponent notifications={notificationsPage?.data} />;
};
