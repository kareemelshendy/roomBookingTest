import useSWR from "swr";
import { NotificationsPage } from "../models";

export const useNotifications = (notificationsFallback: any = undefined) => {
  const { data, error } = useSWR<NotificationsPage>(`/notifications`, {
    fallbackData: notificationsFallback ? notificationsFallback : undefined,
  });

  return {
    notificationsPage: data,
    isLoading: !data && !error,
    isError: error,
  };
};
